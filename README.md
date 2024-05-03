# Learning Management System (LMS)

This project was initiated as part of a thesis defense at the Faculty of Computer Science, aimed at achieving an engineering degree.

# Purpose
The application serves the dual purpose of streamlining the learning process for students and enhancing collaboration between professors and students. By engaging with tests and study materials, students accumulate points that elevate their ranking within the student community. This gamified approach fosters student motivation and cultivates healthy competition among peers.

# Features
For Students
- Access to tests and study materials to facilitate learning.
- Earn points through test performance and study progress.
- Enhance competitiveness and motivation through ranking system.

For Professors
- Create tests for subjects taught.
- Upload relevant study materials.
- Monitor test popularity and quality.
- Track student progress and engagement.

# Getting Started

To get acquainted with the functionality of the platform, register here: https://quiz-place.netlify.app/register by choosing the desired role!

# Project is using:
    React - https://pl.reactjs.org/
    Type Script - https://www.typescriptlang.org/
    Scss - https://sass-lang.com
    Vite - https://vitejs.dev
    Google firebase - https://firebase.google.com

# Project link
Project link: 
https://quiz-place.netlify.app/

## Installation process
- Install any IDE of your choice
- Clone repository 
- Install node modules by npm install
- Start project npm run dev
- Now the project is running press 'o' to open browser with app
- Press 'q' to close app

## Build and Test
Clone the repository and use npm install command to download and install all required node modules
After instalation is completed type 
- npm run build for build
- npm run dev to start project

## File structure
1. assets => 
   All images, styles, icons or fonts and others that are not related to the code go here
2. components => 
   Directories for sets of components, e.g. under the `Menu` directory, will have the implementation of the interface and functionality for the page menu
3. data => 
   This folder contains a .pdf file with a resume, which can be downloaded from the website
4. features =>
   This folder contains form validation schemes for the FormikDocs library
4. pages => 
   I store all pages here. Each page is a combination of all elements/components into a whole that is to be displayed to the user
5. styles => 
   This folder contains all the necessary .scss styles for the entire project, as well as imported fonts, global styles, variables needed for styles and a normalize.scss file
6. translation => 
   This is where .json files are stored for different languages (pl, en)