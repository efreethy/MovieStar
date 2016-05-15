

## ![alttext](./public/images/MovieStar-logo.png )

### Description

 [MovieStar](http://moviestar-io.tech) is an application in two senses:
 * A minimalist web application which enables users to search and favorite movies
 * An application for a teaching position at General Assembly

#### Back-end

* Built on NodeJS, and deployed via Heroku.
* Runs against a postgres database.
* Server uses Sequelize ORM to interface with the database.
* Uses express-session to provide basic authentication for protected routes.

#### Front-end

* Single page application built on AngularJS
*  Service that uses [OMDBapi](http://www.omdbapi.com/) to search for matching movies and then return the results.
* Straightforward routing, controllers, and services for beginners

### Comments

This application was built with the expectation that it be accessible to beginners in web application programming. Some topics have been glossed over for the sake of reducing the learning curve as well as time. This includes testing, advanced authentication (session tokens/password hashing), error handling, and server side controllers and services.

Comments are peppered throughout the application in order to explain general relationships between parts of the app.  In order to fully teach these topics, my next step would be to create docs that explain the various parts of the application and the frameworks more deeply. Also, a healthy discussion can really go a long way in developing a student's understanding.
