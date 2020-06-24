# Upload Project Gutenberg books

Download this and unzip: [Project Gutenberg Books Metadata](http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip)

then place the unzipped `cache` folder in the project root. That should look like: `~/${workspaceRoot}/cache/epub/**`

## Prerequisites

You will need to have Docker, Node and yarn installed on your system.

You will also need to create an env file with the following parameters:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DBNAME=test
MYSQL_USER=root
MYSQL_PASS=example
BOOKS_DIRECTORY=cache/epub
```

## How to use

Launch
```
yarn                  // install packages
docker-compose up -d  // run mysql container
yarn start            // run in production mode
```
