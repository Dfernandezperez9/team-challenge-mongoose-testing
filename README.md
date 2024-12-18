
Social network-style application, 100% Backend, developed in Express using Mongoose for database creation in MongoDB, returns information directly in JSON format, allows for a complete CRUD (Create, Read, Update, Delete) of posts in the MongoDB database.

The GET '/' endpoint returns all posts.

The GET '/id/:_id' endpoint displays only the post selected by its MongoDB ID.

The GET '/title/:title' endpoint displays only the post selected by its title.

The PUT '/id/:_id' endpoint allows modifying the values of the post selected by its MongoDB ID.

The DELETE '/id/:_id' endpoint allows deleting the post selected by its MongoDB ID.

The POST '/create' endpoint allows creating a post from scratch by entering the necessary data in the body; if the schema is invalid, the terminal will return an error.

The GET '/postsWithPagination' endpoint allows customizing the number of posts displayed per page using the '?page=2&limit=1' parameters.


To execute the PUT, POST, and DELETE methods, a tool like Postman is required.