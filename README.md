# 🛍️ Vanta Studio

A modern full-stack e-commerce application built with **Next.js**, **TypeScript**, **Prisma**, and **SQLite**.

Vanta Studio demonstrates a complete online shopping experience with authentication, product management, cart, checkout, order history, and an admin dashboard.

---

## 🚀 Live Demo

> Add your deployed link here

**Live:** https://your-app.vercel.app

---

## 📸 Screenshots

> Add screenshots here after deployment.

### Home Page

![Home](./screenshots/home.png)

### Product Page

![Product](./screenshots/product.png)

### Cart

![Cart](./screenshots/cart.png)

### Admin Dashboard

![Admin](./screenshots/admin.png)

---

# ✨ Features

## Customer

- User Registration
- User Login & Logout
- Protected Profile Page
- Browse Products
- Product Details
- Product Search
- Wishlist
- Shopping Cart
- Checkout
- Order History

---

## Admin

- Admin Authentication
- Protected Admin Dashboard
- View Products
- Add Products
- Edit Products
- Delete Products

---

## Backend

- REST API
- Prisma ORM
- SQLite Database
- Password Hashing (bcrypt)
- Zod Validation
- Role-Based Authorization

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

---

## Backend

- Next.js API Routes
- Prisma ORM
- SQLite
- Zod
- bcrypt

---

## Tools

- Git
- GitHub
- Prisma Studio
- Thunder Client

---

# 📂 Project Structure

```text
src/
│
├── app/
│   ├── api/
│   ├── admin/
│   ├── cart/
│   ├── checkout/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   └── products/
│
├── components/
│
├── context/
│
├── lib/
│
├── providers/
│
├── types/
│
└── data/

prisma/
public/
```

---

# 🗄 Database

## Main Models

- User
- Product
- Order
- OrderItem

---

# Authentication

- User Registration
- Password Hashing
- Login
- Role-Based Authorization
- Protected Routes

---

# API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Products

```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

## Orders

```
GET  /api/orders
POST /api/orders
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/rohitcreates/vanta-studio.git
```

Go into the project

```bash
cd vanta-studio
```

Install dependencies

```bash
npm install
```

Create the database

```bash
npx prisma generate
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL="file:./dev.db"
```

---

# What I Learned

This project helped me gain practical experience with:

- Building a full-stack application using Next.js
- Designing REST APIs
- Database modeling with Prisma
- Authentication and authorization
- CRUD operations
- State management using React Context
- Form validation with Zod
- TypeScript in production-scale applications
- Building protected admin features

---

# Future Improvements

- PostgreSQL
- JWT Authentication
- Image Uploads (Cloudinary)
- Payment Gateway Integration
- Email Verification
- Password Reset
- Order Management Dashboard
- User Management Dashboard
- Analytics Dashboard

---

# Author

**Rohit Singh**

GitHub: https://github.com/rohitcreates

---

# License

This project is for educational and portfolio purposes.