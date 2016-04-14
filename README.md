articles-products-and-express
Goal

Build a mock application which will have 2 resources: Products and Articles. Each resource will have an implementation of CRUD (create, read, update, delete). You should make use of Express' Router module to keep your code organized. Routes go in a directory called routes.

In addition, you will also have additional routes which will render HTML to the user. You will harness the power of Jade to build your templates and have them be dynamic. These templates should go in a directory called templates.

Each of your resources will have it's own module in charge of it's own data. This module should have helper methods for retreiving data. Keep these files in a directory named db.

note: we are not using a database, having a folder called db sort of sets up us for our next topic, databases.

Here is a loose example of a module you'd build for ./db/articles.js.

Project Structure Example:

image

Routes
Product Routes

/products

POST creates a new product
The incoming request will look like this: { "name": String, "price": String, "inventory": Number }
from this request you will save your data as { "id": Number, "name": String, "price": String, "inventory": Number }
id is a unique identifier for this item. You will generate this on the server side and it will be used to access specific products with it
Respond with { "success": Bool }, true if successful otherwise false
/products/:id

PUT edits a product. Finds a product in a collection with the same id value and updates the information.
The incoming request will look like this: { "id": Number, ... }
... represents a field to be edited for example: if the server was sent { "id": 12, "name": "Water Bed" } the server will find the product with an id of 12 and change the name property to be "Water Bed".
/products/:id

DELETE removes a product by it's id.
Respond with { "success": Bool }, true if successful otherwise false
Routes below will output html generated from our templates. Inside of your templates directory you should have the templates below in a directory called products

/products

GET responds with HTML generated from your template which displays all Products added thus far.
file name: index.jade
/products/:id/edit

GET responds with HTML generated from your templates.
The HTML should contain a form (with values already pre-filled?) so that a user can update the information for a product. This form points to your server's route for editing a product.
file name: edit.jade
/products/new

GET responds with HTML generated from your templates.
The HTML should contain an empty form which a user will be able to create a new product. This form points to your server's route for creating a new product.
file name: new.jade
Storing Products

Articles Routes

/articles

POST creates a new article
The incoming request will look like this: { "title": String, "body": String, "author": String }
from this request you will save your data as { "title": String, "body": String, "author": String, "urlTitle": String }
title is a unique identifier for this item. You will generate this on the server side and it will be used to access specific products with it
urlTitle is similar to the title that was passed in but instead is a URL Encoded version. Javascript has a native way to url-encode strings. example: If given a title of "The Best Magpie Developer of 2016", it's url-encoded equivilent is "The%20Best%20Magpie%20Developer%20of%202016".
Respond with { "success": Bool }, true if successful otherwise false
/articles/:title

PUT edits a product. Finds an article in a collection with the same title value and updates the information.
The incoming request will look like this: { "title": String, ... }
... represents a field to be edited for example: if the server was sent { "title": "The Best Magpie Developer of 2016", "body": "Removed content."} the server will find an article with an title of "The Best Magpie Developer of 2016" and change the body property to be "Removed content.".
/article/:title

DELETE removes a article by it's title.
Respond with { "success": Bool }, true if successful otherwise false
note: The title property is mandatory and at least one other key. If the intend is to change the title then use the key newTitle.

Routes below will output html generated from our templates. Inside of your templates directory you should have the templates below in a directory called articles

/articles

GET responds with HTML generated from your template which displays all Articles added thus far.
file name: index.jade
/articles/:title/edit

GET responds with HTML generated from your templates.
The HTML should contain a form (with values already pre-filled?) so that a user can update the information for an article. This form points to your server's route for editing an article.
file name: edit.jade
/articles/new

GET responds with HTML generated from your templates.
The HTML should contain an empty form which a user will be able to create a new article. This form points to your server's route for creating a new article.
file name: new.jade
Middleware
Here are some middleware code for you to implement.

Analytics Tracker

Scope: All incoming requests.
log to a file all uri that are requested. we need each request on it's own line
format: [method] [uri] [timestamp] [all headers]
file location: all logs should go into a directory called logs and end with the .log extension
file name: the logs should be separated per day, please figure out a way to create a nice file name which displays date. e.g. 2016.01-17.13-45-06.log
Payload Validation

Scope: Each Resource having it's own validator.
Check headers on Articles

Scope: Incoming requests to any /articles route.
must have the header version: 1.0
if not respond back with { "error": "bad headers" }
Do not allow header X-Do-Not-Track

Scope: All incoming Requests
must NOT have this header.
if this header is present respond back with { "error": "sorry, we wanna track you" }
Resources
Dev League's Express slide deck

Dev League's Middleware slide deck

Dev league's Templating (JADE) slide deck

Dev League's Module Pattern slide deck

Expressjs.com

Jade