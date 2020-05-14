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

### Admin Login

> email: `admin@tutorial.com`

> password: `123456`

## API Endpoints

### Responses

```javascript
{
  "success": bool,
  "data": array||object||string
}
```

### Status Code

| Status Code | Description  |
| :---------- | :----------- |
| 200         | OK           |
| 201         | Created      |
| 400         | Bad Request  |
| 401         | Unauthorized |
| 403         | Forbidden    |
| 404         | Not Found    |

### Authentication

Create, read and update users

#### POST Sign In

Sign a user in to retrieve access token

```
POST https://startng-tutor.herokuapp.com/api/v1/auth/sign-up
```

##### Body

```
{
	"email": "student@tutorial.com",
	"password": "123456"
}
```

#### POST Sign Up

Create new user with student or tutor role.

_NB: You can't sign up as admin._

```
POST https://startng-tutor.herokuapp.com/api/v1/auth/sign-up
```

##### Body

```
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

#### POST Add Category

Create category for subjects. Category can be Primary, JSS and SSS.

```
POST https://startng-tutor.herokuapp.com/api/v1/categories
```

##### Access - Admin User

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

##### Body

```
{
	"name": "SSS",
	"description": "Category for all junior secondary education"
}
```

#### GET Retrieve all Categories

Get all categories

```
GET https://startng-tutor.herokuapp.com/api/v1/categories
```

##### Access - All Users

##### Headers

```
Content-Type    application/json
Authorization   Token
```

#### GET Retrieve a Category

- Get a category by Id

```
GET https://startng-tutor.herokuapp.com/api/v1/categories/:catId
```

##### Access - All Users

##### Params

- catId - Category Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### PUT Update a Category

- Update a category by Id

```
PUT https://startng-tutor.herokuapp.com/api/v1/categories/:catId
```

##### Access - Admin Users

##### Params

- catId - Category Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

##### Body

```
{
	"name": "SSS",
	"description": "Category for all junior secondary education"
}
```

#### DELETE Delete a Category

Delete a category by Id

```
DELETE https://startng-tutor.herokuapp.com/api/v1/categories/:catId
```

##### Access - Admin Users

##### Params

- catId - Category Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

### Subject

#### POST Add Subject

Create subjects under a category of Id, catId.

```
POST https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject
```

##### Access - Admin User

##### Params

- catId - Category Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

##### Body

```
{
	"name": "English Language",
	"description": "Language subject for junior secondary."
}
```

#### GET Retrieve all Subjects

Retrieve all subjects under a category of Id, catId.

```
GET https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject
```

##### Access - All User

##### Params

- catId - Category Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### GET Retrieve a Subject

Retrieve a subject under a category of Id, catId by the subject Id, subId.

```
GET https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject/:subId
```

##### Access - All User

##### Params

- catId - Category Id
- subId - Subject Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### PUT Update a Subject

Update a subject under a category of Id, catId by the subject Id, subId.

```
PUT https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject/:subId
```

##### Access - Admin User

##### Params

- catId - Category Id
- subId - Subject Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### DELETE Delete a Subject

Delete a subject under a category of Id, catId by the subject Id, subId.

```
DELETE https://startng-tutor.herokuapp.com/api/v1/categories/:catId/subject/:subId
```

##### Access - Admin User

##### Params

- catId - Category Id
- subId - Subject Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### GET Search a Subject by subject name

Search a subject by name sorted alphabetically.

```
GET https://startng-tutor.herokuapp.com/api/v1/subjects?name=subject_name
```

##### Access - All Users

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

### Lesson

#### POST Book a Lesson

Student can book a lesson or admin can book a lesson for a student

```
POST https://startng-tutor.herokuapp.com/api/v1/lessons
```

##### Access - Admin, Student User

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

##### Body

```
{
	"studentEmail": "student@tutorial.com", - optional for student booking lessons
	"tutorEmail": "tutor@tutorial.com",
  "category": "jss",
  "subject": "English Language"
}
```

#### GET Retrieve all Lessons

Retrieve all lessons.

```
GET https://startng-tutor.herokuapp.com/api/v1/lessons
```

##### Access - Admin Users

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### GET Retrieve a Lesson

Retrieve a lesson by Id.

```
GET https://startng-tutor.herokuapp.com/api/v1/lessons/:lessonId
```

##### Access - All User

##### Params

- lessonId - Lesson Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### DELETE Delete a Lesson

Delete a lesson by Id.

```
DELETE https://startng-tutor.herokuapp.com/api/v1/lessons/:lessonId
```

##### Access - All User

##### Params

- lessonId - Lesson Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

### Tutor

#### GET Search Tutor by Name

Search for tutors by first name sorted alphabetically

```
GET https://startng-tutor.herokuapp.com/api/v1/users?name=name
```

##### Access - All User

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### GET Retireve all Tutors

Get all tutors

```
GET https://startng-tutor.herokuapp.com/api/v1/users/tutors
```

##### Access - Admin Users

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### GET Retireve Tutor by Id

Get a tutor by Id

```
GET https://startng-tutor.herokuapp.com/api/v1/users/tutors/:tutId
```

##### Access - Admin Users

##### Params

- tutId - Tutor Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### PUT Deactivate Tutor by Id

Deactivate a tutor by Id

```
PUT https://startng-tutor.herokuapp.com/api/v1/users/tutors/:tutId
```

##### Access - Admin Users

##### Params

- tutId - Tutor Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### Tutor Register for a Subject in a Category

Tutor registers to take a subject

```
PUT http://localhost:5000/api/v1/category/:catId/subjects/:subId/register
```

##### Access - Tutor Users

##### Params

- catId - Category Id
- subId - Subject Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### GET Retrieve all subjects taken by Tutor

Retrieve all subjects taken by Tutor

```
GET https://startng-tutor.herokuapp.com/api/v1/users/tutors/subjects
```

##### Access - Tutor Users

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### PUT Delete Registered subject

Tutor can de-register a registered subject

```
PUT http://localhost:5000/api/v1/category/:catId/subjects/:subId/delete
```

##### Access - Tutor Users

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### PUT Make Admin Tutor

Admin can become a tutor.

```
PUT http://localhost:5000/api/v1/users/make-tutor
```

##### Access - Admin Users

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

#### PUT Make Tutor Amin

Admin can make a tutor admin

```
PUT http://localhost:5000/api/v1/users/tutors/:tutId/make-admin
```

##### Access - Admin Users

##### Params

- tutId - Tutor Id

##### Headers

| Key           | Value            |
| :------------ | :--------------- |
| Content-Type  | application/json |
| Authorization | Token            |

The API is live [here](https://startng-tutor.herokuapp.com/)

Extensive documentation with examples [here](https://documenter.getpostman.com/view/6195417/SzmfXc9n)

- Version: 1.0.0
- License: MIT
- Author: Ismail Hassan
