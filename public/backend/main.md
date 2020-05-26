# Documentation of the Backend part
> Deliverable D1
## General group information
| Member n. | Role          | First name | Last Name | Matricola | Email address   |
| --------- | ------------- | ---------- | --------- | --------- | --------------- |
| 1 | Team leader | Francesco | Peressini | 10523034 | francesco.peressini@mail.polimi.it |
| 2 | Member | Stefano | Martina | 10503949 | stefano.martina@mail.polimi.it |
| 3 | Member | Tommaso | Peresson | 10526013 | tommaso.peresson@mail.polimi.it |

## Links to other deliverables
 - Deliverable D0: the web application is accessible at [this address](https://martina-peressini-peresson.herokuapp.com).
 - Deliverable D2: the YAML or JSON file containing the specification of the app
  API can be found at [this address](https://martina-peressini-peresson.herokuapp.com/backend/spec.yaml).
 - Deliverable D3: the SwaggerUI page of the same API is available at
  [this address](https://google.com).
 - Deliverable D4: the source code of D0 is available as a zip file at
  [this address](https://google.com).
 - Deliverable D5: the address of the online source control repository is
  available [this address](https://github.com/francescoperessini/Hypermedia-Applications-PoliMi-2020). We hereby declare that this
  is a private repository and, upon request, we will give access to the
  instructors.

## Specification
### Web Architecture
![Three tier architecture](multi-tier.png)

The web architecture implemented is a three tier one: Presentation, Application and Data layers represent the three different 
actors which interact between them as shown in the picture above.

More in detail, the Presentation layer presents data to the user by rendering HTML pages, both the static and the dynamic part, 
the Application layer interacts with the Presentation and the Data layers respectively responding to the API requests received 
by the client and retrieving data from the database. Finally, the Data layer represents the DBMS, in our case a PostgreSQL database server.

It is ensured that the HTML is rendered client side (in the Presentation layer) since the HTML pages are rendered using an API schema.

### API
#### REST compliance
Describe here to what extent did you follow REST principles and what are the reasons for which you might have decided to diverge. Note, you must not describe the whole API here, just the design decisions.
#### OpenAPI Resource models
- Event: represents a generic event offered by the Association; it contains the ID of the event, its name, date and time, a short presentation, some practical info, the skill 
level required and the url of the associated image;
- Person: represents a member of the Association; it contains the ID of the person, and some personal information like his/her name, surname, email, telephone, 
leitmotiv, skills, a short description and the url of the associated image;
- Service: represents a generic service offered by the Association; it contains the ID of the service, its name, 
a short presentation, some practical info, and an array of urls for the associated images;
- Error: represents the generic structure for the errors returned by the server; it contains the response code 
(for example 400/404), and a short message to explain what went wrong with the request. 
### Data model
![Logical design](logical.png)

Describe with an ER diagram the model used in the data layer of your web application. How these map to the OpenAPI data model?
## Implementation
### Tools used
#### Environment
- Node.js: an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.
#### Tools
- WebStorm: a powerful and intelligent IDE that gives you the best coding assistance for JavaScript, 
HTML and CSS and a wide range of modern web technologies. WebStorm is perfectly equipped for complex client-side 
development and server-side development with Node.js;
- Database Tools and SQL (WebStorm plugin): a database plugin for IntelliJ-based IDEs providing support for all the 
features available in the standalone IDE for databases, DataGrip. It enables handling information stored in relational 
databases along with SQL language support;
- Swagger Editor: open source editor fully dedicated to OpenAPI-based APIs.The Swagger Editor is an easy way to 
get started with the OpenAPI Specification (formerly known as Swagger), with support for Swagger 2.0 and OpenAPI 3.0.
#### Languages
- JavaScript.
#### Frameworks and Libraries
- Knex.js: Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, 
and Amazon Redshift designed to be flexible, portable, and fun to use. It features both traditional 
node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, 
full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized 
responses between different query clients and dialects;
- serve-static: a Node.js library used to serve static content over HTTP.

### Discussion
Describe here:
- How did you make sure your web application adheres to the provided OpenAPI specification? Which method did you use to test all APIs endpoints against the expected response?
- Why do you think your web application adheres to common practices to partition a REST-based web application (static assets vs. application data)
- Describe synthetically why and how did you manage session state, what are the state change triggering actions (e.g., POST to login etc..).
- Which technology did you use (relational or a no-SQL database) for managing the data model?
## Other information
### Task assignment
Describe here how development tasks have been subdivided among members of the group, e.g.:
> - Foo worked on front end (80%) and OpenAPI Spec (20% of the time) > - Bar worked on ....
### Analysis of existing API
Describe here the research of (full or part of) existing APIs that are similar in objectives and scope to the one implemented, that have possibly guided implementation choices (these should not be necessarily OpenAPI implementations). Toy APIs (such as the Swagger's Pet Store) or the example shown during lectures are not a valid response.
Use TWO or more items of the form:
> We took (full/partial) inspiration from API <XYZ>(link) for the part of the > API that manages <ABC> because of <REASON>.
Or
> For the part of the API that manages <ABC> we considered/studied <XYZ>(link) > because of <REASON> but wasn't completely fitting to our purpose because of > <REASON>.

### Learning outcome
What was the most important thing all the members have learned while developing this part of the project, what questions remained unanswered, how you will use what you've learned in your everyday life?

Examples:

- Foo learned to write SQL queries and Javascript but wanted to know more about caching, he's probably going to create his own startup with what she has learned
- Bar learned how to deploy on a cloud platform, he would have liked to know more about promises for asynchronous code..
