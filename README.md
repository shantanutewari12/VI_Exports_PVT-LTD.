# Tender Management System for VI Export Pvt Ltd

Welcome to the Tender Management System! This application is designed to streamline and manage tenders, including creating, updating, and viewing tender details. It features an intuitive admin panel and user view, leveraging the power of Next.js for both server-side rendering and client-side functionality.

## Features

- Manage tender lifecycle (Create, Read, Update, Delete) for tenders.
- Admin panel for managing tender data.
- User view for browsing active tenders.
- Dynamic API integration for seamless data handling.
- Responsive design with dark theme customization.
- Efficient routing and data fetching using Next.js features.

## Technologies Used

### Frontend:
- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: Core library for building the user interface.
- **Axios**: For making HTTP requests to interact with backend APIs.
- **CSS Modules/Styled-Components**: For customized styling with dark theme support.
- **Vite**: Fast build tool for development and bundling.

### Backend:
- **Node.js**: JavaScript runtime for server-side functionality.
- **Express.js**: Backend framework for creating APIs.
- **MongoDB**: NoSQL database for storing tender data.
- **Mongoose**: ODM to manage MongoDB models and schema.
- **JWT**: For secure authentication and session management.

## Approach

The project is structured with a clean separation of concerns:

1. **Frontend (Next.js):**
   - I used Next.js for SSR (Server-Side Rendering) to optimize performance.
   - Each view (Admin, User) is separated into different components under the `pages` directory for easy routing.
   - Axios was used to handle API requests for managing tender data.
   - Dark theme support is implemented using CSS variables and modules for a consistent UI.
   
2. **Backend (Node.js):**
   - The backend consists of RESTful APIs built using Express.js.
   - A MongoDB database, hosted either locally or on a cloud service (MongoDB Atlas), stores all tender information.
   - Mongoose was used to define the schema and handle the interaction between the application and MongoDB.
   - JWT-based authentication was implemented to provide secure access to the admin panel.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** set up (either locally or on MongoDB Atlas).
- **Vite** installed for the frontend build.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shantanutewari12/VI_Exports_PVT-LTD..git
   cd tender-management-app
