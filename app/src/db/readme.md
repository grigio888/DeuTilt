To create a new model:

```
npx sequelize-cli model:generate --name Example --attributes column1:string,column2:string,column3:string
```

This will create a new model file in the `app/src/db/models` directory. The model will be a using node.js module syntax, but we need to convert it to ES6 module syntax in order to use it in svelte.
Use the model file in the `app/src/db/models` directory as a reference to convert it.

To migrate the model to the database:

```
npx sequelize-cli db:migrate
```

This will create a new table in the database with the specified columns.