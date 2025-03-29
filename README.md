# EmployWise User Management App

🚀 Overview

This is a React-based user management application that integrates with the Reqres API. The application allows users to authenticate, list users with pagination, edit user details, and delete users. It follows best practices for clean and modular code, ensuring a seamless and user-friendly experience.

🛠️ Tech Stack

Frontend: React (Vite)

State Management: Redux Toolkit (optional) / Context API

HTTP Requests: Axios / Fetch API

Styling: Tailwind CSS

Routing: React Router

Persistence: Cookies for authentication tokens

🎯 Features

✅ User Authentication (Login & Logout)
✅ User Listing with Pagination
✅ Edit & Delete User Functionality
✅ Error Handling & Form Validation
✅ Persistent Login Token
✅ Responsive Design (Mobile & Desktop)
✅ Client-Side Search & Filtering (Bonus)
✅ Navigation with React Router (Bonus)
✅ Hosted Online (Bonus)

🔐 Authentication

Users must log in with valid credentials from the Reqres API.

The authentication token is stored in local storage.

If the token is missing or expired, users are redirected to the login page.

📜 API Endpoints

Login: POST https://reqres.in/api/login

Get Users: GET https://reqres.in/api/users?page={page_number}

Update User: PUT https://reqres.in/api/users/{id}

Delete User: DELETE https://reqres.in/api/users/{id}

🎨 UI & UX

The app is fully responsive and adapts to different screen sizes.

Tailwind CSS is used for a clean and modern look.

Forms include validation to prevent incorrect submissions.

🔍 Bonus Features

Search & Filtering: Users can search for specific users.

React Router: Navigation between login, user list, and edit user pages.

Hosting: The app is deployed on

🤝 Contributing

Feel free to fork this repository, create a new branch, and submit a pull request. Contributions are welcome!

📬 Contact

For any questions or feedback, reach out at cseabhishek8094@gmail.com .
