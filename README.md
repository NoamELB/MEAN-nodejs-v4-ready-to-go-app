# A MEAN ready to go app
## Node v4.1.1
## Angular 1.4.6

Server guide:
The app is split into packages, using best practices in ES6.
Each package contains several files, which operate like this:
  Routes take care of urls and deciding which functions to use upon.
  Middleware are functions that are used to verify details given from the routes. 
  Controller further handles the routes using services.
  Services holds all the database calls and any logic that needs to be operated. Controller/Middleware should use the services as much as possible.
  Model holds the structure of the object.

In order to keep order, efficiency and testability, we instantiate all the classes in the bootstrap, and then inject them down the line using the function init. This makes testing very simple.
Speaking of which, all files in each package should be covered by unit tests as much as possible, using Mocha and Chai packages.

To make life easier, we built a script that generates these templates. The templates' base is located in the folder "template" in the server folder
Simply run "node server/buildTemplate" and it will create the template according to the file structure.json in lib/main/ .

For a complete package example, see the "user" folders.
