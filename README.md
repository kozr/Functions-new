# Functions-new
This repo stores all the cloud functions for our current database. New cloud functions should be added and deployed here.

## Getting started
### Firebase tools
Make sure you have firebase tools installed.

```yarn global add firebase-tools```

### Setting env variables
To set environemnt variables for firebase functions, use the following command:

```firebase functions:config:set <serviceName>.<variableName>=<apiKey>```

All env variables must have two parts: `<serviceName>.<variableName>`. To use them in your functions, run this command before deploying them:

```firebase functions:config:get > .runtimeconfig.json```

To actually access the env variables inside a function, run this:

```functions.config().<serviceName>.<variableName>```

### Node versions
There might be an error during the deploy stage resembling:

```The engine "node" is incompatible with this module. Expected... Got... ```

In that case, use [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) to change the version of Node and run the deploy command again.

## Deploying
After making changes and adding any new functions to `src/index.ts`, you can follow these steps to deploy them to our database:

* Choose the appropriate database you want to deploy to:

```firebase use <dbName>```

* Run the functions locally to test them:

```yarn serve```

* Deploy!

```yarn deploy```

## Contributing
Check out our [contribution guidelines](CONTRIBUTING.md)

## Further reading
* [https://firebase.google.com/docs/functions](https://firebase.google.com/docs/functions)
* [https://firebase.google.com/docs/typescript](https://firebase.google.com/docs/functions/typescript)
* [https://firebase.google.com/docs/get-started](https://firebase.google.com/docs/functions/get-started)
* [https://firebase.google.com/docs/config-env](https://firebase.google.com/docs/functions/config-env)
