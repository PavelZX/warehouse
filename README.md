# warehouse

To run the app you must build the API first. To do that, please follow these instructions:

    Go to /server and create a file called .env with the following code, changing the variables as needed:

    PORT=3001
    DB_HOST="localhost"
    DB_NAME="reddit_clone"
    DB_USER="root"
    DB_PASSWORD=""
    DB_DIALECT="mysql"
    NODE_ENV="development"
    SECRET_ACCESS_TOKEN="very_strong_secret_1"
    SECRET_REFRESH_TOKEN="very_strong_secret_2"

    Create a MySQL database with a name that matches the DB_NAME variable you created in the previous step so that the db tables are created
    In the /server folder, open your terminal and run the commands: npm i, tsc and node dist/index.js
    Open a new terminal instance and go to the /client folder and run npm i and npm start
