-- Create database
CREATE DATABASE IF NOT EXISTS testify;
USE testify;

-- Create User table
CREATE TABLE IF NOT EXISTS User (
  u_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender CHAR(1),
  age BIGINT,
  domain VARCHAR(255)
);

-- Create Quiz table
CREATE TABLE IF NOT EXISTS Quiz (
  q_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  time TIMESTAMP NOT NULL
);

-- Create Question table
CREATE TABLE IF NOT EXISTS Question (
  ques_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  q_id BIGINT NOT NULL,
  marks BIGINT NOT NULL,
  text VARCHAR(255) NOT NULL,
  FOREIGN KEY (q_id) REFERENCES Quiz(q_id)
);

-- Create Options table
CREATE TABLE IF NOT EXISTS Options (
  o_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  ques_id BIGINT NOT NULL,
  text VARCHAR(255) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  FOREIGN KEY (ques_id) REFERENCES Question(ques_id)
);

-- Create User_Response table
CREATE TABLE IF NOT EXISTS User_Response (
  u_id BIGINT NOT NULL,
  q_id BIGINT NOT NULL,
  ques_id BIGINT NOT NULL,
  o_id BIGINT NOT NULL,
  time TIMESTAMP NOT NULL,
  PRIMARY KEY (u_id, q_id, ques_id),
  FOREIGN KEY (u_id) REFERENCES User(u_id),
  FOREIGN KEY (q_id) REFERENCES Quiz(q_id),
  FOREIGN KEY (ques_id) REFERENCES Question(ques_id),
  FOREIGN KEY (o_id) REFERENCES Options(o_id)
);

-- Create Result table
CREATE TABLE IF NOT EXISTS Result (
  res_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  u_id BIGINT NOT NULL,
  q_id BIGINT NOT NULL,
  score BIGINT NOT NULL,
  time_taken TIMESTAMP NOT NULL,
  rank BIGINT,
  FOREIGN KEY (u_id) REFERENCES User(u_id),
  FOREIGN KEY (q_id) REFERENCES Quiz(q_id)
);

-- Insert sample data
-- Insert sample users
INSERT INTO User (name, email, password, gender, age, domain) VALUES
('John Doe', 'john@example.com', 'password123', 'M', 28, 'Computer Science'),
('Jane Smith', 'jane@example.com', 'password123', 'F', 24, 'Web Development'),
('Alex Johnson', 'alex@example.com', 'password123', 'M', 32, 'Data Science');

-- Insert sample quizzes
INSERT INTO Quiz (name, time) VALUES
('JavaScript Fundamentals', NOW()),
('React Basics', NOW()),
('Node.js Advanced', NOW());

-- Insert sample questions for JavaScript Fundamentals
INSERT INTO Question (q_id, marks, text) VALUES
(1, 1, 'Which of the following is NOT a JavaScript data type?'),
(1, 1, 'What does the === operator do in JavaScript?'),
(1, 1, 'Which method is used to add elements to the end of an array?');

-- Insert sample options for the first question
INSERT INTO Options (ques_id, text, is_correct) VALUES
(1, 'String', 0),
(1, 'Boolean', 0),
(1, 'Float', 1),
(1, 'Object', 0);

-- Insert sample options for the second question
INSERT INTO Options (ques_id, text, is_correct) VALUES
(2, 'Checks for equality with type conversion', 0),
(2, 'Checks for equality without type conversion', 1),
(2, 'Assigns a value to a variable', 0),
(2, 'None of the above', 0);

-- Insert sample options for the third question
INSERT INTO Options (ques_id, text, is_correct) VALUES
(3, 'push()', 1),
(3, 'pop()', 0),
(3, 'unshift()', 0),
(3, 'shift()', 0);

-- Insert sample user responses
INSERT INTO User_Response (u_id, q_id, ques_id, o_id, time) VALUES
(1, 1, 1, 3, NOW()),
(1, 1, 2, 6, NOW()),
(1, 1, 3, 9, NOW());

-- Insert sample results
INSERT INTO Result (u_id, q_id, score, time_taken, rank) VALUES
(1, 1, 3, NOW(), 1),
(2, 1, 2, NOW(), 2),
(3, 1, 1, NOW(), 3);
