# GitHub Login with Express and Passport.js

This project demonstrates how to implement GitHub OAuth login using Express.js, Passport.js, and MongoDB. It includes user authentication with GitHub, storing user data in MongoDB, session management, and a simple interface to log in and log out.

## Features

- GitHub OAuth authentication using Passport.js
- User information stored in MongoDB
- Session management with `express-session` and `connect-mongo`
- User login, logout, and session persistence
- Error handling and custom views for success and failure pages

## Prerequisites

- Node.js
- npm or yarn
- MongoDB
- GitHub Developer Account for OAuth credentials

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/github-login-app.git
   cd github-login-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following:

   ```env
   SECRET=somethingstrong
   CLIENT_ID=your_github_client_id
   CLIENT_SECRET=your_github_client_secret
   ```

   Replace `your_github_client_id` and `your_github_client_secret` with your actual GitHub OAuth credentials.

4. **Set up MongoDB:**

   Ensure that MongoDB is running locally or provide a connection string to a remote MongoDB instance. The application uses `mongodb://localhost/github-login` by default.

5. **Run the application:**

   ```bash
   npm start
   ```

   The application will be running on `http://localhost:3000`.

## Usage

1. **Home Page:**

   Visit `http://localhost:3000/` to see the home page. Here, you'll find a link to log in using GitHub.

2. **Login with GitHub:**

   Click the "Login with GitHub" link to authenticate with your GitHub account. You'll be redirected to GitHub to authorize the app and then back to the application.

3. **Success or Failure Pages:**

   - On successful login, you'll be redirected to the success page, which displays your GitHub profile information.
   - If login fails, you'll be redirected to a failure page with a link to try again.

4. **Logout:**

   You can log out by clicking the "Logout" link on the success page.

## Project Structure

- `app.js`: Main application file where middleware and routes are defined.
- `routes/index.js`: Contains routes for handling authentication and rendering views.
- `routes/users.js`: Example route for user listing.
- `models/User.js`: Mongoose schema for storing user data.
- `modules/passport.js`: Passport.js configuration for GitHub OAuth strategy.
- `views/`: EJS templates for rendering pages.
- `.env`: Environment variables (not included in the repository, should be created locally).

## Contributing

Feel free to fork this project, submit pull requests, or open issues for any bugs or feature requests.
