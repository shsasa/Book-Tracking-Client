# �� Book Tracking Web App

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking, rating, and organizing books fetched from an external API. Designed with user personalization and admin moderation in mind.

---

![ERD Diagram](./ERD.png)

---

![Wireframe](./wireFrame.png)

---

![Component Hierarchy](./prject3.png)

## �� Features

### �� Public Users

- Browse book list from an external API
- View book details (title, author, year, genres, description)
- Search and filter books by title or genre
- Register/Login to save preferences

### �� Registered Users

- Add books to:
  - Favorites List
  - Read List (with page progress if book is a PDF)
  - Custom Lists
- Add favorite authors
- Rate books (1–5 stars) and view average ratings
- Write private notes on books
- Show/hide book lists in profile
- Track reading goals (monthly/yearly)
- View activity history
- View recently added books
- Receive toast notifications for actions

### ��️ Admin Features

- Role-based access for admin
- Delete or hide inappropriate comments
- Remove/reset user book lists
- Ban or hide specific books
- Log admin actions (e.g. reason for banning)

---

## �� Tech Stack

- **Frontend**: React, React Router, Context API or Redux, TailwindCSS / Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT + bcrypt
- **File Uploads**: Multer (for profile pictures)
- **External API**: Google Books API or similar

---
