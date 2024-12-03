CREATE DATABASE book_recommendation;
USE book_recommendation;

CREATE TABLE books (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authors TEXT,
    publisher VARCHAR(255),
    description TEXT,
    pageCount INT
);

INSERT INTO books (id, title, authors, publisher, description, pageCount) 
VALUES 
    ('1', 'Book Title 1', 'Author A, Author B', 'Publisher X', 'A great book about...', 300),
    ('2', 'Book Title 2', 'Author C', 'Publisher Y', 'Another great book about...', 150);
