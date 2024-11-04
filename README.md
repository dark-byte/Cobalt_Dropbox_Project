<div align="left" style="position: relative;" style="margin: -20px 0 0 20px;">
<h1>COBALT DROPBOX PROJECT</h1>
<p align="left">
</p>
<p align="left">
	<img src="https://img.shields.io/github/last-commit/dark-byte/Cobalt_Dropbox_Project?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/dark-byte/Cobalt_Dropbox_Project?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/dark-byte/Cobalt_Dropbox_Project?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🧪 Testing](#🧪-testing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)



## 📍 Overview

This is an assignment given by Cobalt for their Backend Internship role. <br><br>
<b>Task:</b> Implement "Dropbox" to List Folder and Create Folder. Develop a secure web application that allows users to log in with Gmail, securely store their details, and connect with Dropbox. The application should include thorough documentation, error handling, and a user-friendly interface.


## 👾 Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Utilizes a split architecture with separate backend and frontend configurations.</li><li>Backend is configured for ES6 and CommonJS modules in `backend/tsconfig.json`.</li><li>Frontend supports ES5 and JSX for React in `frontend/tsconfig.json`.</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Strict type-checking and modular structure enforced through TypeScript.</li><li>Code quality tools integrated via npm scripts in `package.json` files.</li><li>Consistent use of async/await and middleware for error handling in backend.</li></ul> |
| 📄 | **Documentation** | <ul><li>Comprehensive setup and usage instructions available in `README.md`.</li><li>Codebase includes inline comments and module descriptions for maintainability.</li><li>Documentation includes install, usage, and test commands using `<npm>`.</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrates with Dropbox API for file management.</li><li>Google OAuth for user authentication.</li><li>Database interactions managed through MongoDB in `backend/src/config/dbConfig.ts`.</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Backend and frontend are modularly separated with distinct `package.json`.</li><li>Codebase structured around MVC pattern in backend for clear separation of concerns.</li><li>Frontend components organized by functionality (Auth, DropboxManager, etc.).</li></ul> |
| 🧪 | **Testing**       | <ul><li>Backend testing configured with Jest in `backend/jest.config.ts`.</li><li>Includes tests for authentication and Dropbox integration.</li><li>Utilizes MongoDB Memory Server for isolated database testing environments.</li></ul> |
| 🛡️ | **Security**      | <ul><li>JWT for secure token-based user authentication.</li><li>Password hashing and secure handling of authentication data.</li><li>Security middleware in place to validate user tokens and manage sessions.</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Managed through `<npm>`, with separate dependency configurations for backend and frontend.</li><li>Uses essential libraries like Express, Mongoose, React, and Passport.</li><li>Dependency management files located in `backend/package.json` and `frontend/package.json`.</li></ul> |


### 📂 Project Index
<details>
	<summary><b><code>COBALT_DROPBOX_PROJECT/</code></b></summary>
	<details> <!-- backend Submodule -->
		<summary><b>backend</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Configures TypeScript compilation settings for the backend, specifying ES6 as the target JavaScript version and CommonJS for module management<br>- It defines the source directory as "./src" and the output directory as "./dist".</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/jest.config.ts'>jest.config.ts</a></b></td>
				<td>- Configures the Jest testing framework for a TypeScript-based backend, specifying settings such as the testing environment, file extensions, and coverage metrics<br>- It sets up the project's directory structure for tests, integrates TypeScript with Jest, and excludes certain files from coverage to streamline test operations and improve maintainability.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/package.json'>package.json</a></b></td>
				<td>- Serves as the configuration backbone for the backend module, defining dependencies, scripts, and metadata essential for building, running, and testing the server-side application</td>
			</tr>
			</table>
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/server.ts'>server.ts</a></b></td>
						<td>- Initializes and starts the server for the application by importing the main app configuration, setting up environment variables, and defining the server's listening port<br>- It ensures the server is operational and accessible, typically on port 5000, providing feedback through console logs about the server status and active port.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/app.ts'>app.ts</a></b></td>
						<td>- Backend/src/app.ts establishes the core server configuration and middleware for the project's backend, integrating essential services such as Express, CORS, and Passport<br>- It connects to the database, sets up authentication, user, and Dropbox-related routes, and initializes a basic server response to confirm operational status<br>- This file serves as the backbone for handling requests and structuring API endpoints.</td>
					</tr>
					</table>
					<details>
						<summary><b>__tests__</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/__tests__/setup.ts'>setup.ts</a></b></td>
								<td>- Establishes the testing environment for the backend by configuring MongoDB Memory Server, loading specific environment variables, and silencing console outputs during test runs<br>- It ensures a clean, isolated database instance and consistent environmental settings, facilitating reliable integration and unit testing.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/__tests__/dropbox.test.ts'>dropbox.test.ts</a></b></td>
								<td>- Tests Dropbox integration endpoints within the application, ensuring functionality such as authentication, folder listing, folder creation, and item deletion<br>- It validates responses and error handling, using mocked services and models to simulate interactions with Dropbox and user data.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/__tests__/auth.test.ts'>auth.test.ts</a></b></td>
								<td>- Authentication test suite in `backend/src/__tests__/auth.test.ts` validates the registration and login functionality of the application<br>- It ensures new users can register, handles cases where users already exist, and verifies user login with correct and incorrect credentials, using mocked user data and responses.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>config</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/config/dbConfig.ts'>dbConfig.ts</a></b></td>
								<td>- ConnectDB establishes a connection to MongoDB using environment variables for configuration<br>- It handles successful connections with a confirmation message and exits the application upon failure, ensuring robustness in database interactions<br>- This module is crucial for enabling data storage and retrieval functionalities across the backend services of the application.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>controllers</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/controllers/userController.ts'>userController.ts</a></b></td>
								<td>- User data retrieval is managed within the backend architecture by the userController.ts, specifically through the getUserData function<br>- It efficiently fetches and verifies user details from the database, returning essential information such as name, email, and profile picture, ensuring a streamlined user identification process within the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/controllers/dropboxController.ts'>dropboxController.ts</a></b></td>
								<td>- Manages Dropbox integration for user authentication and file management within the application<br>- Functions include redirecting users for Dropbox authentication, handling authentication callbacks, verifying Dropbox tokens, and performing file operations like listing, creating, and deleting folders and files in a user's Dropbox account.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/controllers/authController.ts'>authController.ts</a></b></td>
								<td>- AuthController.ts manages user authentication within the backend architecture, handling registration, login, and Google OAuth callbacks<br>- It validates user inputs, manages password security, and generates JSON Web Tokens for session management, ensuring secure and efficient user access control across the application.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>models</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/models/Users.ts'>Users.ts</a></b></td>
								<td>- Defines the User model in the system's backend, utilizing MongoDB through Mongoose for schema definition and data management<br>- It specifies user attributes such as email, password, and name, with additional fields for Google authentication and Dropbox integration, ensuring unique identification and facilitating third-party services connectivity.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>routes</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/routes/authRoutes.ts'>authRoutes.ts</a></b></td>
								<td>- AuthRoutes.ts establishes the authentication pathways for the backend, integrating both standard email/password and Google OAuth mechanisms<br>- It defines routes for user registration, login, and handles Google OAuth callbacks using middleware for validation and authentication processes, ensuring secure user access and management within the system.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/routes/userRoutes.ts'>userRoutes.ts</a></b></td>
								<td>- UserRoutes.ts establishes the routing mechanism for user-related operations within the backend service<br>- It integrates authentication middleware to secure routes and delegates the handling of user data retrieval to the userController<br>- This setup ensures that user data requests are authenticated and processed efficiently, supporting the application's security and data management architecture.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/routes/dropboxRoutes.ts'>dropboxRoutes.ts</a></b></td>
								<td>- Manages Dropbox-related routes within the backend architecture, interfacing with the Dropbox API through defined controllers<br>- It includes authentication checks and routes for Dropbox authorization, token management, and file operations like listing, creating, and deleting folders<br>- Validation ensures necessary data is present for operations requiring specific path inputs.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>utils</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/utils/asyncHandler.ts'>asyncHandler.ts</a></b></td>
								<td>- `asyncHandler` serves as a middleware utility within the backend architecture, enabling seamless error handling for asynchronous operations in Express applications<br>- It wraps asynchronous route handlers, ensuring that any uncaught errors are forwarded to the Express error handling pipeline, thus enhancing the robustness and error management of the server.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>services</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/services/dropboxService.ts'>dropboxService.ts</a></b></td>
								<td>- Manages Dropbox integration by facilitating user authentication, token management, and file operations such as listing, creating, and deleting folders or files within a user's Dropbox account<br>- It ensures secure access and interaction with Dropbox's API to extend functionality for file management in the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/services/authService.ts'>authService.ts</a></b></td>
								<td>- Integrates Google authentication into the application, managing user authentication and session management through JWT tokens<br>- It supports user creation and updates within the system using Google profile information, ensuring streamlined access and identity verification processes<br>- This component is crucial for secure and efficient user management and authentication workflows.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>middleware</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/backend/src/middleware/authMiddleware.ts'>authMiddleware.ts</a></b></td>
								<td>- AuthMiddleware serves as a security layer within the backend architecture, validating user access by checking and decoding JWT tokens from incoming requests<br>- It ensures that each request is associated with a valid, authenticated user before allowing further processing by subsequent middleware or route handlers.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- frontend Submodule -->
		<summary><b>frontend</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Configures TypeScript compilation settings for the frontend, targeting ES5 and supporting JSX for React.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/package.json'>package.json</a></b></td>
				<td>- Package configuration for the frontend module specifies dependencies essential for the development and testing of a React application.</td>
			</tr>
			</table>
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/App.tsx'>App.tsx</a></b></td>
						<td>- App.tsx serves as the central routing component in the frontend architecture, managing navigation and access control across the application<br>- It integrates authentication checks to redirect users between public pages like Home, Login, and Register, and protected routes such as Dashboard, ensuring a secure user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/index.tsx'>index.tsx</a></b></td>
						<td>- Initializes the React application by rendering the main App component within the root DOM node<br>- It employs React's strict mode for highlighting potential problems in an application<br>- The index.tsx acts as the entry point, setting up the React environment and integrating global styles from App.css, crucial for the overall frontend architecture.</td>
					</tr>
					</table>
					<details>
						<summary><b>styles</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/styles/App.css'>App.css</a></b></td>
								<td>- Centralizes and standardizes the visual design across the frontend interface by defining CSS styles for body, navigation elements, forms, and interactive components<br>- It utilizes CSS variables for consistent theming and ensures responsive, user-friendly navigation and form interactions, enhancing the overall user experience and interface consistency.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/styles/variable.css'>variable.css</a></b></td>
								<td>- Defines the foundational style parameters for the frontend of the application, setting universal color schemes, typography, spacing, effects, and transitions<br>- These CSS custom properties ensure a consistent visual and interactive experience across all user interface components, facilitating maintainability and scalability of the frontend design.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/DropboxManager.css'>DropboxManager.css</a></b></td>
								<td>- Defines the visual styling for the DropboxManager component within the frontend architecture, ensuring a consistent and responsive user interface<br>- Styles include layout configurations, color schemes, and interactive elements like buttons and lists, enhancing user interaction and visual appeal across various device sizes.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/DropboxManager.tsx'>DropboxManager.tsx</a></b></td>
								<td>- DropboxManager serves as a component within the frontend architecture, managing interactions with Dropbox<br>- It enables users to view, create, and delete Dropbox folders using authenticated sessions<br>- The component utilizes React hooks for state management and effects, ensuring a responsive user interface that updates according to Dropbox's API responses.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/Navbar.tsx'>Navbar.tsx</a></b></td>
								<td>- Navbar.tsx serves as the navigation component within the frontend architecture, managing user authentication states and navigation links<br>- It dynamically adjusts content based on user authentication status, offering links to home, dashboard, login, and registration pages, and includes a logout functionality that clears relevant tokens and navigates to the home page.</td>
							</tr>
							</table>
							<details>
								<summary><b>Auth</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/Auth/Register.css'>Register.css</a></b></td>
										<td>- Defines the styling for the registration form component within the frontend architecture, ensuring a visually appealing and user-friendly interface<br>- It sets dimensions, colors, and interactivity for elements like headings, inputs, and buttons, enhancing the overall user experience during the registration process in the web application.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/Auth/Auth.css'>Auth.css</a></b></td>
										<td>- Defines the styling for authentication components within the frontend architecture, specifically for login and registration forms<br>- It utilizes CSS variables for consistent theming and responsive design elements, ensuring forms are visually appealing and functionally robust with focus states and hover effects to enhance user interaction.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/Auth/Login.tsx'>Login.tsx</a></b></td>
										<td>- Login.tsx serves as the user authentication component within the frontend architecture, enabling users to log in using either standard credentials or Google OAuth<br>- It integrates with the authService for credential verification, manages session tokens via AuthContext, and provides navigation to the dashboard upon successful login, enhancing user experience with success and error notifications.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/components/Auth/Register.tsx'>Register.tsx</a></b></td>
										<td>- Register.tsx serves as the user registration component within the frontend architecture, handling user input for name, email, and password<br>- It integrates client-side validation, communicates with the backend via the authService to register users, and provides feedback through toast notifications<br>- Successful registration redirects users to the login page.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>pages</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/pages/Dashboard.css'>Dashboard.css</a></b></td>
								<td>- Defines the styling for the Dashboard page within the frontend architecture, focusing on layout and aesthetics for user interface elements like user information display and Dropbox login functionality<br>- It utilizes CSS properties for design consistency and interactive elements, enhancing user experience through visual feedback and structured presentation.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/pages/Home.css'>Home.css</a></b></td>
								<td>- Defines the styling for the Home page within the frontend architecture, ensuring a visually appealing and responsive layout<br>- It utilizes CSS variables for consistent theming and spacing, focusing on center alignment and flexibility of the home content and buttons, enhancing user interaction through dynamic visual feedback on hover.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/pages/Home.tsx'>Home.tsx</a></b></td>
								<td>- Home.tsx serves as the landing page for the Dropbox Manager application within the frontend architecture<br>- It provides a welcoming interface and facilitates user navigation by offering links to the Login and Register pages, thereby initiating user interaction and access management in the web application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/pages/Dashboard.tsx'>Dashboard.tsx</a></b></td>
								<td>- Manages user interactions on the dashboard page, handling authentication states, Dropbox integration, and user data retrieval<br>- It facilitates user login, Dropbox account linking, and displays user information<br>- The component also dynamically updates based on authentication status and manages related notifications for a seamless user experience.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>context</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/context/PrivateRoute.tsx'>PrivateRoute.tsx</a></b></td>
								<td>- PrivateRoute.tsx serves as a security component within the frontend architecture, ensuring that only authenticated users can access certain parts of the application<br>- It utilizes the AuthContext to check if a user is authenticated, redirecting to the login page if not, thereby safeguarding private routes and maintaining user session integrity.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/context/AuthContext.tsx'>AuthContext.tsx</a></b></td>
								<td>- Manages user authentication and session tokens within the frontend architecture, specifically handling the storage and state of authentication and Dropbox tokens<br>- It ensures users are redirected appropriately post-authentication and maintains user state across the application, facilitating secure and efficient user interactions with the system.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>services</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/services/dropboxService.ts'>dropboxService.ts</a></b></td>
								<td>- Manages interactions with the Dropbox API, facilitating operations such as retrieving files, authenticating users, and managing folders and items within Dropbox<br>- It leverages environment-specific API URLs and handles both successful operations and errors, ensuring secure communication via token-based authorization.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/src/services/authService.ts'>authService.ts</a></b></td>
								<td>- Manages user authentication for the frontend of the application, facilitating user registration, login, and Google sign-in functionalities<br>- It interacts with the backend's authentication API to securely handle user credentials and session management, ensuring a seamless user experience across the application's services.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>public</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/public/index.html'>index.html</a></b></td>
						<td>- Serves as the entry point for the web application, initializing the user interface by loading essential resources like icons, viewport settings, and the manifest for app installation<br>- It sets up the environment for the React application to mount, ensuring proper display and functionality across various devices and browsers.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/dark-byte/Cobalt_Dropbox_Project/blob/master/frontend/public/manifest.json'>manifest.json</a></b></td>
						<td>- Defines the web application's metadata for browser interaction, specifying essential attributes like the app's name, icons, and theme colors<br>- It configures how the app appears on a user's home screen and influences initial loading properties, enhancing user experience by setting it to operate in a standalone display mode.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>


## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with Cobalt_Dropbox_Project, ensure your runtime environment meets the following requirements:

- **Node JS:** Make sure you have Node Js installed in your system.
- **Package Manager:** Npm


### ⚙️ Installation

Install Cobalt_Dropbox_Project by following these instructions:

**Clone and Install:**

1. Clone the Cobalt_Dropbox_Project repository:
```sh
❯ git clone https://github.com/dark-byte/Cobalt_Dropbox_Project
```

2. Navigate to the project directory:
```sh
❯ cd Cobalt_Dropbox_Project
```

3. Install the project dependencies:
```sh
❯ npm install
```

**Setup Environment Variables**

1. Create .env file in the backend directory:
```sh
PORT=8000
MONGO_URI=mongodb://localhost:27017/cobalt_dropbox
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
DROPBOX_CLIENT_ID=your_dropbox_client_id
DROPBOX_CLIENT_SECRET=your_dropbox_client_secret
DROPBOX_REDIRECT_URI=http://localhost:8000/api/dropbox/auth/callback
```

2. Create .env file in the frontend directory:
```sh
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_DROPBOX_API_URL=http://localhost:8000/api/dropbox
```

**Run the project**

1. Start the Server:
```sh
❯ cd backend
❯ npm run dev
```

2. Start the Frontend:
```sh
❯ cd ../frontend
❯ npm start
```




### 🧪 Testing
Run the test suite using the following command in the backend directory:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


## 🎗 License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/mit/) file.



## 🙌 Acknowledgments
I would like to express my gratitude to the following resources that supported the development of this project:

1. **Google OAuth API**: For implementing user authentication and authorization, we utilized the [Google OAuth API Documentation](https://developers.google.com/identity/protocols/oauth2).
2. **Dropbox API**: This project uses Dropbox’s API for file management, with guidance from the [Dropbox API Documentation](https://www.dropbox.com/developers/documentation).
3. **Jest**: Testing for the project was performed using Jest, with references from the [Jest Documentation](https://jestjs.io/docs/en/getting-started).
4. **MongoDB**: The backend database for the project was managed using MongoDB, with support from the [MongoDB Documentation](https://www.mongodb.com/docs/).
5. **React Auth Context and Private Routes**: YouTube tutorials on setting up authentication context and private routes in React provided valuable guidance.

These resources, along with AI Tools like GPT-4o, Github Co Pilot were used for understanding and Implementation of features.
