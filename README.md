# CU-Boulder-test

## Front End

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## REST API

In order to mock an API and get data, a json server had been created
In your terminal, in your project repo, type:

- cd json-server
- json-server --watch db.json

The routes you can call are:
`http://localhost:3000/questions` with a list of all the questions
`http://localhost:3000/votes` with a list of all the votes
Those routes accept GET/POST/UPDATE, etc...

db.json is filed with 5 questions and 1 vote as an example.

I didn't use Java since 10+ years so I didn't feel confident enough using it here,although I created the files I thought we would need to make the API works, they're under the repo /json-server/java-files

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
