# Friday-challenge-backend

<!--Overvoew session-->

## 👀 Overview

This package holds the PostgreSQL containerized database and a GraphQL API.

---

<!--Running session-->

## 🚀 Local Setup

Make sure you fulfill the [requirements](https://github.com/K-Schaeffer/friday-challenge#requirements).

If it's not your first time running the project, simply run:

```sh
# friday-challenge/packages/backend
yarn start
```

Or

```sh
# friday-challenge/
yarn start:backend
```

### 🎲 Running

#### Initiate PostgreSQL container

```sh
# friday-challenge/packages/backend
docker compose up -d
```

#### Prepare the database (migration and seed)

```sh
# friday-challenge/packages/backend
yarn prepare
```

Or

```sh
# friday-challenge/
yarn prepare:backend
```

#### Start API

```sh
# friday-challenge/packages/backend
yarn start
```

Or

```sh
# friday-challenge/
yarn start:backend
```

Congrats! With that you already have the API running on port **4000** ready to receive requests.

### 💻 Testing

#### Database

You can check if the database is properly populated by running:

```sh
# friday-challenge/packages/backend
yarn preview
```

Or

```sh
# friday-challenge/
yarn preview:database
```

This will open Prisma Studio on http://localhost:5555, in which you can see all models and data available in the database.

#### API

Go to [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer) and run queries/mutations from the API.
