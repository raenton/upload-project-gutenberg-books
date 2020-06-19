DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

USE test;

CREATE TABLE books (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title TEXT,
    copyright VARCHAR(255),
    license VARCHAR(255),
    publication_date DATE,
    INDEX title_index (title(255)),
    INDEX pub_date_index (publication_date)
);

CREATE TABLE authors (
	name VARCHAR(255) NOT NULL UNIQUE,
    INDEX name_index (name)
);

CREATE TABLE subjects (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE languages (
	code CHAR(5) PRIMARY KEY
);

-- relations

CREATE TABLE books_authors(
	bookId INTEGER NOT NULL,
    authorName VARCHAR(255) NOT NULL,
    FOREIGN KEY (bookId) REFERENCES books(id),
    FOREIGN KEY (authorName) REFERENCES authors(name),
    UNIQUE (bookId, authorName)
);

CREATE TABLE books_subjects(
	bookId INTEGER NOT NULL,
    subjectName VARCHAR(255) NOT NULL,
    FOREIGN KEY (bookId) REFERENCES books(id),
    FOREIGN KEY (subjectName) REFERENCES subjects(name),
    UNIQUE (bookId, subjectName)
);

CREATE TABLE books_languages(
	bookId INTEGER NOT NULL,
	languageCode CHAR(5) NOT NULL,
    FOREIGN KEY (bookId) REFERENCES books(id),
    FOREIGN KEY (languageCode) REFERENCES languages(code),
    UNIQUE (bookId, languageCode)
);