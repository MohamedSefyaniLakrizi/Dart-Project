# Dart-Project
Capstone Project Dart App
Dart AppDart App is a mobile application designed to digitalize Moroccan tontines (Dart) by streamlining the process of managing rounds, participants, and payments. This app is built using the PER-Native stack, comprising PostgreSQL, Express, React Native, and Node.js.
Features:
User registration and authenticationCreation and management of tontine roundsAdding and managing participants in a roundManaging and tracking payments between participantsViewing and updating user profilesSecure storage of user passwords and RIBs
Getting Started:
These instructions will help you set up the project on your local machine for development and testing purposes.
Prerequisites:
Node.js (https://nodejs.org/en/download/)
PostgreSQL (https://www.postgresql.org/download/)
React Native CLI (https://reactnative.dev/docs/environment-setup)
Installation:
Clone the repository
:git clone https://github.com/yourusername/dart-app.git
cd dart-app
Install the required dependencies:
Install server-side dependencies
cd backendnpm install
Install client-side dependencies
cd ../frontendnpm install
Set up the PostgreSQL database:
Create a database named 'dartdb'.
Execute the SQL commands in 'backend/database/schema.sql' to create the necessary tables.
Create a .env file in the 'backend' directory with the following content:
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=dartdb
JWT_SECRET=your_jwt_secret
Start the backend server:
cd backendnpm start
Start the React Native app:
For iOS
cd ../frontend
npx react-native run-ios
For Android
cd ../frontend
npx react-native run-android
The Dart App should now be running on your local machine.
