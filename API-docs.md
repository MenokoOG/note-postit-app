### API Documentation for Frontend Developers

This documentation will help frontend developers connect to the backend APIs and provide example code for using the APIs in a frontend application.

---

#### API Base URL

```
http://<your-server-domain>/api
```

Replace `<your-server-domain>` with the actual domain or IP address where the backend server is running.

---

### Authentication Endpoints

#### Signup

**Endpoint:** `/auth/signup`  
**Method:** `POST`  
**Description:** Register a new user.

**Request Body:**

```json
{
    "username": "exampleUser",
    "email": "example@example.com",
    "password": "examplePassword"
}
```

**Response:**

```json
{
    "user": {
        "_id": "userId",
        "username": "exampleUser",
        "email": "example@example.com",
        "isAdmin": false,
        "memberSince": "2023-01-01T00:00:00.000Z"
    },
    "token": "jwt-token"
}
```

**Example:**

```javascript
fetch('http://<your-server-domain>/api/auth/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'exampleUser',
        email: 'example@example.com',
        password: 'examplePassword',
    }),
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

#### Login

**Endpoint:** `/auth/login`  
**Method:** `POST`  
**Description:** Login an existing user.

**Request Body:**

```json
{
    "username": "exampleUser",
    "password": "examplePassword"
}
```

**Response:**

```json
{
    "user": {
        "_id": "userId",
        "username": "exampleUser",
        "email": "example@example.com",
        "isAdmin": false,
        "memberSince": "2023-01-01T00:00:00.000Z"
    },
    "token": "jwt-token"
}
```

**Example:**

```javascript
fetch('http://<your-server-domain>/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'exampleUser',
        password: 'examplePassword',
    }),
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

### Notes Endpoints

#### Get Notes

**Endpoint:** `/main/note/`  
**Method:** `GET`  
**Description:** Retrieve all notes for the authenticated user.

**Headers:**

```json
{
    "Authorization": "Bearer <jwt-token>"
}
```

**Response:**

```json
[
    {
        "_id": "noteId",
        "title": "Note Title",
        "description": "Note Description",
        "user": "userId",
        "username": "exampleUser",
        "createdAt": "2023-01-01T00:00:00.000Z"
    }
]
```

**Example:**

```javascript
fetch('http://<your-server-domain>/api/main/note/', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer <jwt-token>`,
    },
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

#### Add Note

**Endpoint:** `/main/note/`  
**Method:** `POST`  
**Description:** Create a new note.

**Headers:**

```json
{
    "Authorization": "Bearer <jwt-token>",
    "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
    "title": "New Note Title",
    "description": "New Note Description"
}
```

**Response:**

```json
{
    "_id": "noteId",
    "title": "New Note Title",
    "description": "New Note Description",
    "user": "userId",
    "username": "exampleUser",
    "createdAt": "2023-01-01T00:00:00.000Z"
}
```

**Example:**

```javascript
fetch('http://<your-server-domain>/api/main/note/', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer <jwt-token>`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: 'New Note Title',
        description: 'New Note Description',
    }),
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

#### Edit Note

**Endpoint:** `/main/note/:noteId`  
**Method:** `PUT`  
**Description:** Update an existing note.

**Headers:**

```json
{
    "Authorization": "Bearer <jwt-token>",
    "Content-Type": "application/json"
}
```

**Request Body:**

```json
{
    "title": "Updated Note Title",
    "description": "Updated Note Description"
}
```

**Response:**

```json
{
    "_id": "noteId",
    "title": "Updated Note Title",
    "description": "Updated Note Description",
    "user": "userId",
    "username": "exampleUser",
    "createdAt": "2023-01-01T00:00:00.000Z"
}
```

**Example:**

```javascript
fetch('http://<your-server-domain>/api/main/note/noteId', {
    method: 'PUT',
    headers: {
        'Authorization': `Bearer <jwt-token>`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: 'Updated Note Title',
        description: 'Updated Note Description',
    }),
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

#### Delete Note

**Endpoint:** `/main/note/:noteId`  
**Method:** `DELETE`  
**Description:** Delete a note by ID.

**Headers:**

```json
{
    "Authorization": "Bearer <jwt-token>"
}
```

**Response:**

```json
{
    "message": "Successfully Deleted Note: Note Title"
}
```

**Example:**

```javascript
fetch('http://<your-server-domain>/api/main/note/noteId', {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer <jwt-token>`,
    },
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

### Additional Notes

- Make sure to replace `<your-server-domain>` with the actual domain or IP address of your server.
- Replace `<jwt-token>` with the actual JWT token received after user authentication.
- Handle error responses and edge cases appropriately in the actual implementation.
- Ensure secure storage of JWT tokens on the client-side (e.g., use HttpOnly cookies or local storage with caution).