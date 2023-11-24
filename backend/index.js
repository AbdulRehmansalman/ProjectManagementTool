const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/authRoute');
const ProjectRoute = require('./Routes/ProjectRoute');
const TaskRoute = require('./Routes/TaskRoute');
const ProgressTrackRoute = require('./Routes/progressTrack');
const Port = process.env.PORT || 8080;

// //*For Secure data password with dotenv: .config ma path kahan hai: main ma include kra sakhoon;or main ma include kar k kahen bhi use;
dotenv.config({ path: './config.env' });
require('./db/conn');

app.use(express.static('dist'));

// Middleware to enable CORS
// app.use(cors({ origin: 'https://abdurrehmanprojectapp.netlify.app' }));
// app.use(
//   cors({
//     origin: 'https://abdurrehmanprojectapp.netlify.app',
//     methods: ['GET', 'POST'],
//     credentials: 'include',
//   })
// );

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON in request bodies
app.use(express.json());

// Middleware to parse URL-encoded data in request bodies
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use(authRoute);
app.use(ProjectRoute);
app.use(TaskRoute);
app.use(ProgressTrackRoute);

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
