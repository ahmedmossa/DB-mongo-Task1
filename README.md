# MongoDB Node.js Task 🚀

This project is a practical task demonstrating various MongoDB operations using Node.js (`mongodb` native driver) with async/await functions.

## 📋 Project Requirements & Operations

The project implements and executes the following 10 operations:
1. **`insertOne`**: Added 2 user documents and displayed their `insertedId`.
2. **`insertMany`**: Added 10 users (with 5 of them having an age of 27) and displayed the inserted count.
3. **`find`**: Retrieved and displayed all documents where the age is 27.
4. **`limit`**: Retrieved and displayed only the first 3 documents where the age is 27.
5. **`findOne`**: Searched and displayed a specific user using their `_id`.
6. **`countDocuments`**: Counted and displayed the total number of users with an age of 27.
7. **`updateOne`**: Updated a user's name using `$set` and increased their age using `$inc`.
8. **`updateMany`**: Increased the age of all users by 5 years using `$inc`.
9. **`deleteOne`**: Deleted a user by their `_id` and displayed the deleted count.
10. **`deleteMany`**: Deleted users matching a specific condition (`$gte: 35`) and displayed the `deletedCount`.

---

## ⚙️ Prerequisites & Setup

Ensure you have the following installed on your machine:
* **Node.js**
* **MongoDB Community Server** (Running locally as a Windows Service)

### Installation Steps

1. Clone the repository or open the project folder.
2. Install the required dependencies:
   ```bash
   npm install
