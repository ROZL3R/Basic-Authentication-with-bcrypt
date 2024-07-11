**# Basic Authentication System**

This is a simple authentication system built with Node.js and Express, using bcrypt for password hashing.

The server will start on port 3000.

## API Endpoints

### 1. Signup

- **URL:** `/signup` , `/login`
- **Method:** `POST`
- **Data Params:** 
```json
{
 "username": "[string]",
 "password": "[string]"
}


