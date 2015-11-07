# foodleDoo

![foodleDoo home page](/readme_images/front_page.png)

> foodleDoo is a cookbook web app where you can store your recipes. The app enables meal nutritional customization by providing meal specific nutritional data. Visit the foodleDoo [here!](foodledoo.herokuapp.com)

## Team

  - __Product Owner and Developer__: Juana Becerra

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

1. Get a free trial API key and APP ID from for the 'Nutrition Analysis API' on the [Edamam API site](https://developer.edamam.com/)

1. Add a file named 'config.js' to the config folder in your root directory with the following code:

```sh
module.exports = {
  env: {
    SECRET: ,
    API_KEY: ,
    API_APP_ID: 
  }
};
```
1. Insert your API key, APP ID, and SECRET as strings. The SECRET variable is used to generate a user authentication token, so it can be any combination of letters. This file is included in the .gitignore as such, it will not be commited to your github.  

1. Follow installing dependencies instructions. 


## Requirements

- angular 1.4.7
- jquery 2.1.4
- angular-ui-router 0.2.15
- bootstrap 3.3.5
- node 0.12.7
- express 4.13.3 
- express-jwt 3.1.0
- body-parser 1.14.1
- bower 1.6.5
- jsonwebtoken 5.4.0
- mongodb 2.0.46
- mongoose 4.1.12
- passport 0.3.0
- passport-local 1.0.0
- supertest 1.1.0
- request 2.65.0
- should 7.1.1
- chai 3.4.0

## Development
### Installing Dependencies

Within the root directory:

Make sure you have npm installed, then ... 

```sh
npm install
bower install
```
for test development:

```sh
npm install -g mocha
```

### Roadmap

View the project roadmap [here](https://github.com/juaniiie/foodledoo/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.