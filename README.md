# Metadata Tech Test (Bibliu)

Please see `TASK.md` for the task requirements.

## Personal Comment

Due to time limitations, there was only so far I could go with this. There is
admittedly a lot that could be done to improve things. The data for one, would be
better suited to a relation database. Authors and Subjects and so on should be separated
into their own tables, rather than having a lot of repeated data in the documents. I chose to use mongo because of familiarity and quick setup, because I could not really afford to spend much more time on this.

There is not much context for the code either, so it is difficult to consider
the architectural terms. The code would also take a different shape depending on the
environment it would end up in, and how the I/O interacted with other services.

## Prerequisites

You will need to have Docker, Node and yarn installed on your system.

## How to use

You will need to extract the files mentioned in the `TASK.md` description and drag the root unzipped folder into the root of this project.

That should look like: `~/${workspaceRoot}/cache/epub/**`

Launch
```
docker pull mongo:latest
docker run -d -p 127.0.0.1:8080:27017/tcp  --name bibliu-mongo mongo:latest
yarn start
```

Unit tests
```
yarn run test
// OR
yarn run test:watch
```

Coverage
```
yarn run coverage
```