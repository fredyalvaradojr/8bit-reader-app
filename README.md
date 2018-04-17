# \*Bit Posts

This app has been developed to allow a user to read an initial list of availabled posts. Interacting with the App you will come across functionality such as being able to add new posts, rate current posts and delete posts. In addition to this functionality you will be able to sort each post list. Some examples of sorting would be by category or by date. Other functionality includes the ability to add comments to each post and upvote or downvote each individual comment.

It was built by using the 'create-react-app' package in the \*bit folder (https://github.com/facebook/create-react-app) and utilizes the API provided by Udacity in the Readable API Server (https://github.com/udacity/reactnd-project-readable-starter) to gather all the posts and different interactions.

The base guideline has been completed and checked off via the provided rubric (https://review.udacity.com/#!/rubrics/1017/view). In addition to this functionality required, I have added validation steps to the forms, a responsive UI to give a better user experience.

## Install the App

### There are two seperate installations that need to take place in order to get this application up and running. Please read through and make sure you install both the server and application.

#### Step 1: Install API Server

```bash
  * `cd api-server`
  * `npm install` or `yarn`
  * `node server`
```

#### Step 2: Install and Start \*Bit Posts

```bash
  * `cd *bit`
  * `npm install` or `yarn`
  * `npm start` or `yarn start`
```

#### Step 3: Visit the Local url:

```bash
http://localhost:3000/
```

# Readable API Server - provided by Udacity

## The following information I have kept the same as it comes directly from Udacity and the code has not been modified.

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
  * `cd api-server`
  * `npm install`
  * `node server`
* In another terminal window, use Create React App to scaffold out the front-end
  * `create-react-app frontend`
  * `cd frontend`
  * `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
