#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  isMember BOOLEAN DEFAULT FALSE,
  isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE passcodes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  passcode VARCHAR(100) NOT NULL
);

INSERT INTO users (firstName, lastName, email, password, isMember, isAdmin) VALUES
('Alice', 'Johnson', 'alice@mail.com', 'hashedpassword1', TRUE, FALSE),
('Bob', 'Smith', 'bob@mail.com', 'hashedpassword2', TRUE, FALSE),
('Charlie', 'Brown', 'charlie@mail.com', 'hashedpassword3', FALSE, FALSE),
('Diana', 'Prince', 'diana@mail.com', 'hashedpassword4', TRUE, TRUE);

INSERT INTO messages (title, text, userId) VALUES
('Hello Club', 'Excited to be a member here!', 1),
('My First Post', 'This is a great community.', 2),
('Just Browsing', 'I hope to join someday.', 3),
('Admin Notice', 'Please keep discussions respectful.', 4),
('Weekend Plans', 'Anyone up for a meetup?', 1);

INSERT INTO passcodes (name, passcode) VALUES
('member', 'hole'),
('admin', '123456p.');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2]
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
