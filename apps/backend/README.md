## Installation

Follow these steps to get up and running with the backend project:

1. Create a `.env` file in the `apps/backend` directory. This file is gitignored and will not be committed to source. Do not commit this file.
2.  Input the `SUPABASE_URL` and `SUPABASE_KEY` values. You will not need to fill out the database section unless you are trying to access the production database locally (which is discouraged).
3. Install and run Postgres locally - https://postgresapp.com/
4. Install [Postico](https://eggerapps.at/postico/) or your preferred Postgres client.
5. Install packages via
```bash
$ yarn install
```

## Running the Database

Once you have set values in `.env` for all your environment variables, start/run postgres

Run all existing migrations to set up database tables.
(must be done every time there are new migrations added)

```bash
$ yarn db:run
```

You should now be able to connect to your local database using Postico and see the tables added.

## Creating/reverting DB migrations
### Commands
```
# generate a new migration with SQL needed to execute updated schema.

yarn db:migrate <ModelName>

# create empty migration file
yarn db:create-migration <MigrationName>

# revert most recent migration
yarn db:revert
```

### Create migration based on new/updated entity:
1. Make changes to any existing `*.entity.ts` file to add/remove columns to existing tables. Create a new `*.entity.ts` file to create a new table all together.
1. Run `yarn db:migrate <NAME_OF_MIGRATION>` to create a migration file. `NAME_OF_MIGRATION` should describe the changes made to the schema (i.e. `CreateMessageTable` or `AddMessageDateColumn`)
1. Run `yarn db:run` to reflect those changes locally. In higher environments, the migrations will run automatically post-build.

### Redoing migrations locally:
If you are creating or updating an entity and have already run the migration locally, you need to do the following to keep migration files clean:
1. Check the migrations table to see if you have already applied the migration you want to undo. If so, run `yarn db:revert` to undo the changes to the DB schema.
1. Delete the migration file you just created.
1. Walk through the steps above to create & run a new migration.


## Running the backend service locally
```bash
$ yarn dev
```

This will start the GraphQL server at `http://localhost:3001/graphql`

This will also spin up and REST endpoints and expose them.
You can view the auto-generated rest docs at ``

## Generating modules/services

```bash
# Generate a new resource 
$ yarn nest g resource <moduleName>

# Asks if you would like a REST endpoint or GraphQL.
# If you are choosing GraphQL, choose code first.

#Or you can do the following below individually

# Generate a module
$ yarn nest g module <moduleName>

# Generate a service
$ yarn nest g service <serviceName>

# Generate a graphql resolver
$ yarn nest generate resolver <name>
```
