# Ethere - E-Commerce Website

Ethere is a modern e-commerce platform focusing on jewelry and fashion products. The platform provides secure role-based access control (RBAC) with authentication and authorization for admin and user roles.

# Developers

- **Shreyas Patil** - [shreyaspatil3007@gmail.com](mailto:shreyaspatil3007@gmail.com)
- **Saurabh Bagal** - [saurabhbagal1234@gmail.com](mailto:saurabhbagal1234@gmail.com)




## Tech Stack

- **Frontend**: React, Redux, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Razorpay
- **Cloud Storage**: Cloudinary

## Features

### Authentication and Authorization
- Users can register, log in, and log out securely.
- JWT-based authentication for secure session handling.
- Role-based access control (RBAC) with predefined admin and user roles.

### Admin Role
Admin users have the following privileges:
- **View All Users**: Access a list of all registered users.
- **Change User Role**: Update user roles for better access management.
- **Upload and Edit Products**: Manage the product catalog by adding or editing product details.
- **View All Orders**: Access a list of all orders placed on the platform.

### User Role
Regular users can:
- Browse products and view detailed descriptions.
- Place orders using Razorpay integration.
- View their order history.

### Payment Integration
- Razorpay is integrated for seamless UPI payments, supporting Google Pay, PhonePe, and other payment methods.

### Protected Routes
The following backend routes are protected and accessible only to authorized users:
- `/reset-password/email`
- `/otp-verification`
- `/all-orders`
- `/admin-panel`
- `/upload-product`
- `/update-product`
- `/delete-adminproduct`

## Environment Variables

To run this project, create `.env` files for both frontend and backend directories and set the following variables:

### Frontend `.env` Template
```env
REACT_APP_CLOUD_NAME_CLOUDINARY=<your-cloudinary-cloud-name>
REACT_APP_RAZORPAY_KEY=<your-razorpay-key> 
```
### Backend .env Template

Create a `.env` file in the root of the backend directory with the following contents:

```env
MONGODB_URI=<your-mongodb-uri>
TOKEN_SECRET_KEY=<your-token-secret-key>
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
WEBHOOK_SECRET=<your-webhook-secret>
EMAIL=<your-email>
EMAIL_PASSWORD=<your-email-password>
JWT_SECRET=<your-jwt-secret>
```

# Getting Started

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) and npm
- [MongoDB](https://www.mongodb.com/) and a database set up

## Backend

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the backend server:
    ```bash
    npm run start
    ```

The backend will run on [http://localhost:2024](http://localhost:2024).

## Frontend

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the frontend server:
    ```bash
    npm run dev
    ```

The frontend will run on [http://localhost:5173](http://localhost:5173).

## Test Credentials

- **Admin**
    - Email: `admin@example.com`
    - Password: `admin@123`

- **User**
    - Email: `user@example.com`
    - Password: `user@123`



Feel free to let us know if there are any improvements or suggestions!
