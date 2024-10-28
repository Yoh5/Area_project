# Server

# Express Server Component Documentation: Main Application File

This documentation describes the main application file of an Express server. The file includes routing for various endpoints, middleware configurations, database interactions, and email sending functionalities.

## Overview

The file creates an Express application and configures it with various routes to handle HTTP requests for registration, login, verification, user retrieval, GitHub events, and user deletion. It also configures a nodemailer transporter for sending emails.

## Component Structure

### Dependencies and Initial Setup

- express: Web framework for Node.js.
- body-parser: Middleware for parsing request bodies.
- validator: Used for email validation.
- dotenv: Loads environment variables from a .env file.
- cors: Enables Cross-Origin Resource Sharing.
- nodemailer: Allows sending emails.
- port: Server port number from environment variables.

### Middleware Configuration

- CORS is enabled for all routes.
- express.json() and express.urlencoded({extended:false}) are used for request body parsing.

### Nodemailer Transporter

- Configured with Gmail service and authentication credentials.

### Utility Functions

- isEmailValid(email): Validates an email address.
- generateRandomString(length): Generates a random string of specified length.

### Routes

- GET /: A simple route for testing server responsiveness.
- POST /: LogIn : handle user log, check the credentials, if valid, proceed to the connection
- POST /register: Handles user registration, checks if the email is valid and unique, inserts a new user into the database, and sends a verification email.
- PUT /verify: Verifies user accounts with a token sent via email.
- GET /user: Retrieves all user data.
- POST /git: Placeholder for handling GitHub events.
- DELETE /delete_user: Deletes a user by ID.
- POST /login: Authenticates a user.
- Additional route for GitHub authentication using a separate router.

### Server Listening

- The application listens on the specified port[8080] for incoming requests.

## Usage

1. Ensure all dependencies are installed via npm install or yarn.
2. Set up environment variables (e.g., database credentials, server port, email credentials) in a .env file.
3. Run the server using Node.js:
   bash
   node [PATH_TO_THIS_FILE].js
   

## Example

To start the server, navigate to the directory where this file is located and run:

bash
node server/index.js


Replace index.js with the actual file name if different.

## Conclusion

This Express application file establishes a backend server with multiple endpoints for user management and integration with external services like email and GitHub. The configuration and routes provided form the core of a backend system that could be part of a larger web application.


# Mobile 

## React Native Login Component Documentation

This documentation details a React Native component named Login. This component is designed for a login screen, providing user interface elements for email and password input, options for social media login, and navigation to other screens upon successful login or registration.

## Overview

The Login component is a functional component that utilizes React's useState hook for managing state. It includes text inputs for email and password, buttons for logging in, and links for social media sign-ins.

## Component Structure

### States

- Email: Stores the user's email address.
- Username: Stores the user’s username.
- password: Stores the user's password.

### Functions

- checkConnection(mail, pass): This asynchronous function takes email and password as arguments. It makes a POST request to a specified URL (in this case, https://deciding-oyster-probably.ngrok-free.app/login) with the email and password. Depending on the response status, it navigates to the profile screen or shows an alert message.
- moveToProfile(): Navigates to the ListServices screen.

### Return (JSX)

- Text Input for Email: Takes and updates the email state.
- Text Input for Password: Takes and updates the password state, with secure text entry for privacy.
- Login Button: On press, calls checkConnection with the current states of Email and Password.
- Social Media Login Options: Buttons for Google and Facebook login (functionality to be implemented).
- Navigation to the Register screen.

## Styles

The component uses StyleSheet from react-native for styling. Styles are defined for the container, text inputs, buttons, and other text elements, focusing on layout, color, and typography.

## Dependencies

- expo-status-bar: Provides the status bar component.
- react-native-vector-icons/FontAwesome: Used for social media icons.

## Usage

To use this component in a React Native application:

1. Import the Login component.
2. Include it in your navigation stack or render it as needed.
3. Ensure that the navigation prop is passed if you're using React Navigation for screen transitions.

## Example

jsx
import React from 'react';
import Login from './path-to-Login'; // Adjust the import path as needed
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        {/* Other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



# WEB

# React Router Component Documentation: App Component

This documentation describes the App component in a React application. This component is responsible for setting up the routing for the application using React Router. It also integrates Google OAuth for the login functionality.

## Overview

The App component is a functional component that uses BrowserRouter and Routes from react-router-dom to define a series of Route components. Each route maps a path in the URL to a specific React component, representing a page in the application.

## Component Structure

### Routes

- /: The root path is linked to the LoadingPage component.
- /login: Renders the LogInPage component within a GoogleOAuthProvider context.
- /signup: Mapped to the SignUpPage component.
- /token: Displays the TokenPage.
- /home: Links to the HomePage.
- /applets: Routes to the AppletPage.
- /areas: Directs to the AreaPage.
- /profil: Opens the ProfilPage.
- /spotify: Shows the SpotifyPage.
- *: A wildcard route that catches all other paths and directs to NotFoundPage.

### Google OAuth Provider

- For the login page, the GoogleOAuthProvider component from @react-oauth/google wraps the LogInPage. It requires a clientId which is specific to the application's OAuth credentials set up in Google Cloud Platform.

## Usage

To use this component:

1. Ensure you have react-router-dom and @react-oauth/google installed.
2. Place the App component at the root of your React application.

## Example

Here's how you might use App in the main entry file of a React application:

jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the import path as needed

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

