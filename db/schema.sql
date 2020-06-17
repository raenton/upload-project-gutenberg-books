DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

USE test;

CREATE TABLE books (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
    copyright VARCHAR(255),
    license VARCHAR(255),
    publication_date DATE,
    INDEX title_index (title),
    INDEX pub_date_index (publication_date)
);

CREATE TABLE authors (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
    INDEX name_index (name)
);

CREATE TABLE subjects (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE languages (
	code CHAR(2) PRIMARY KEY
);

-- relations

CREATE TABLE books_authors(
	bookId INTEGER NOT NULL,
    authorId INTEGER NOT NULL,
    FOREIGN KEY (bookId) REFERENCES books(id),
    FOREIGN KEY (authorId) REFERENCES authors(id),
    UNIQUE (bookId, authorId)
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
	languageCode CHAR(2) NOT NULL,
    FOREIGN KEY (bookId) REFERENCES books(id),
    FOREIGN KEY (languageCode) REFERENCES languages(code),
    UNIQUE (bookId, languageCode)
);