# Online Tutor API

> Backend Server for an online tutor app

## Usage

Create a .env file in your root directory and add the follwing along with their values:

```
- MONGO_URI=
- JWT_SECRET=
- JWT_EXPIRE=
- PORT=
```

## Install Dependencies

```
yarn
```

## Run App

```
# Run in dev mode
yarn run dev

# Run in prod mode
yarn start
```

## Demo

The API is live [here](https://startng-tutor.herokuapp.com/)

Extensive documentation with examples [here](https://documenter.getpostman.com/view/6195417/SzmfXc9n)

### Admin Login

> email: `admin@tutorial.com`

> password: `123456`

## API Endpoints

### Responses

#### Success

```javascript
{
  "success": true,
  "data": array||object||string
}
```

#### Failure

```javascript
{
  "success": false,
  "data": string
}
```

#### Status Code

| Status Code | Description  |
| :---------- | :----------- |
| 200         | OK           |
| 201         | Created      |
| 400         | Bad Request  |
| 401         | Unauthorized |
| 403         | Forbidden    |
| 404         | Not Found    |

### Headers

All endpoints except for login and signup have the following headers properties set

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

### Authentication

Create, read and update users

> #### POST Sign In

Sign a user in to retrieve access token

```javascript
POST https://startng-tutor.herokuapp.com/api/v1/auth/sign-up
```

##### Body

| Property | Description           |          |
| :------- | :-------------------- | :------- |
| email    | Email address of user | required |
| password | Password of user      | required |

Example

```javascript
{
	"email": "student@tutorial.com",
	"password": "123456"
}
```

> #### POST Sign Up

Create new user with student or tutor role.

_NB: You can't sign up as admin._

```javascript
POST https://startng-tutor.herokuapp.com/api/v1/auth/sign-up
```

##### Body

| Property  | Description                  |          |
| :-------- | :--------------------------- | :------- |
| firstName | First name of user           | required |
| lastName  | Last name of user            | required |
| email     | Email address of user        | required |
| role      | User role [tutor or student] | required |
| password  | Password of user             | required |

Example

```javascript
{
	"firstName": "student",
	"lastName": "123456",
	"email": "student@tutorial.com",
	"role":"student",
	"password": "123456"
}
```

### Category

Create, read, update and delete category

> #### POST Add Category

Create category for subjects. Category can be Primary, JSS and SSS.

```javascript
POST https://startng-tutor.herokuapp.com/api/v1/categories
```

##### Access - Admin User

##### Body

| Property    | Description              |          |
| :---------- | :----------------------- | :------- |
| name        | Name of category         | required |
| description | Text describing category | optional |

Example

```javascript
{
	"name": "SSS",
	"description": "Category for all junior secondary education"
}
```

> #### GET Retrieve all Categories

Retrieve all categories

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/categories
```

##### Access - All Authenticated Users

> #### GET Retrieve a Category

Get a category by Id

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/categories/:catId
```

##### Access - All Users

##### Params

- catId - Category Id

> #### PUT Update a Category

Update a category by Id

```javascript
PUT https://startng-tutor.herokuapp.com/api/v1/categories/:catId
```

##### Access - Admin Users

##### Params

- catId - Category Id

##### Body

| Property    | Description                  |          |
| :---------- | :--------------------------- | :------- |
| name        | New category name            | required |
| description | New text describing category | optional |

Example

```javascript
{
	"name": "SSS",
	"description": "Category for all junior secondary education"
}
```

> #### DELETE Delete a Category

Delete a category by Id

```javascript
DELETE https://startng-tutor.herokuapp.com/api/v1/categories/:catId
```

##### Access - Admin Users

##### Params

- catId - Category Id

### Subject

> #### POST Add Subject

Create subjects under a category of Id, catId.

```javascript
POST https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject
```

##### Access - Admin User

##### Params

- catId - Category Id

##### Body

| Property    | Description             |          |
| :---------- | :---------------------- | :------- |
| name        | Name of subject         | required |
| description | Text describing subject | optional |

Example

```javascript
{
	"name": "English Language",
	"description": "Language subject for junior secondary."
}
```

> #### GET Retrieve all Subjects

Retrieve all subjects under a category of Id, catId.

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject
```

##### Access - All User

##### Params

- catId - Category Id

> #### GET Retrieve a Subject

Retrieve a subject under a category of Id, catId by the subject Id, subId.

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject/:subId
```

##### Access - All User

##### Params

- catId - Category Id
- subId - Subject Id

##### Headers

> #### PUT Update a Subject

Update a subject under a category of Id, catId by the subject Id, subId.

```javascript
PUT https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject/:subId
```

##### Access - Admin User

##### Params

- catId - Category Id
- subId - Subject Id

> #### DELETE Delete a Subject

Delete a subject under a category of Id, catId by the subject Id, subId.

```javascript
DELETE https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject/:subId
```

##### Access - Admin User

##### Params

- catId - Category Id
- subId - Subject Id

> #### GET Search a Subject by subject name

Search a subject by name sorted alphabetically.

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/subjects?name=subject_name
```

##### Access - All Users

### Lesson

> #### POST Book a Lesson

Student can book a lesson or admin can book a lesson for a student

```javascript
POST https://startng-tutor.herokuapp.com/api/v1/lessons
```

##### Access - Admin, Student User

##### Body

| Property     | Description                    |                                                        |
| :----------- | :----------------------------- | :----------------------------------------------------- |
| studentEmail | Email address of student       | required but optional if student is making the request |
| tutorEmail   | Email address of tutor of user | required                                               |
| category     | Name of subject category       | required                                               |
| subject      | Name of subject                | required                                               |

Example

```javascript
{
  "studentEmail": "student@tutorial.com",
  "tutorEmail": "tutor@tutorial.com",
  "category": "jss",
  "subject": "English Language"
}
```

> #### GET Retrieve all Lessons

Retrieve all lessons.

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/lessons
```

##### Access - Admin Users

> #### GET Retrieve a Lesson

Retrieve a lesson by Id.

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/lessons/:lessonId
```

##### Access - All User

##### Params

- lessonId - Lesson Id

> #### DELETE Delete a Lesson

Delete a lesson by Id.

```javascript
DELETE https://startng-tutor.herokuapp.com/api/v1/lessons/:lessonId
```

##### Access - All User

##### Params

- lessonId - Lesson Id

### Tutor

> #### GET Search Tutor by Name

Search for tutors by first name sorted alphabetically

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/users?name=name
```

##### Access - All User

> #### GET Retireve all Tutors

Get all tutors

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/users/tutors
```

##### Access - Admin Users

> #### GET Retireve Tutor by Id

Get a tutor by Id

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/users/tutors/:tutId
```

##### Access - Admin Users

##### Params

- tutId - Tutor Id

> #### PUT Deactivate Tutor by Id

Deactivate a tutor by Id

```javascript
PUT https://startng-tutor.herokuapp.com/api/v1/users/tutors/:tutId
```

##### Access - Admin Users

##### Params

- tutId - Tutor Id

> #### Tutor Register for a Subject in a Category

Tutor registers to take a subject

```javascript
PUT http://localhost:5000/api/v1/category/:catId/subjects/:subId/register
```

##### Access - Tutor Users

##### Params

- catId - Category Id
- subId - Subject Id

> #### GET Retrieve all subjects taken by Tutor

Retrieve all subjects taken by Tutor

```javascript
GET https://startng-tutor.herokuapp.com/api/v1/users/tutors/subjects
```

##### Access - Tutor Users

> #### PUT Delete Registered subject

Tutor can de-register a registered subject

```javascript
PUT http://localhost:5000/api/v1/category/:catId/subjects/:subId/delete
```

##### Access - Tutor Users

##### Params

- catId - Category Id
- subId - Subject Id

> #### PUT Make Admin Tutor

Admin can become a tutor.

```javascript
PUT http://localhost:5000/api/v1/users/make-tutor
```

##### Access - Admin Users

> #### PUT Make Tutor Amin

Admin can make a tutor admin

```javascript
PUT http://localhost:5000/api/v1/users/tutors/:tutId/make-admin
```

##### Access - Admin Users

##### Params

- tutId - Tutor Id

#

- Version: 1.0.0
- License: MIT
- Author: Ismail Hassan
