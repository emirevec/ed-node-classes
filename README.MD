# Node.js MVC Integrative Project

## Table of contents
- [Project description](#project-description)
- [JavaScrpt and TypeScript](#javascript-and-typescript)
- [Technologies used](#technologies-used)
- [Database](#database)
- [Documentation](#Documentation)

>
> To view the full content of this and other courses, you can visit the [EducacionIT website](https://educacionit.com.ar)
>

## Project description
This repository contains the final project for my Node.js course, where we developed a full-featured e-commerce application using the Model-View-Controller (MVC) architecture. The project focuses on the creation, retrieval, updating, and deletion (CRUD) of both user and product data. It leverages several powerful Node.js libraries and integrates with MongoDB Atlas to store and manage data.

## JavaScript and TypeScript
This project was initially developed in JavaScript, taking advantage of its flexibility and simplicity to quickly build out the core features. As the project evolved, it was upgraded to TypeScript. This transition was made to introduce static typing, which helps catch errors at compile-time, improve code clarity, and enhance maintainability. The use of TypeScript also facilitated better tooling and editor support, contributing to a more efficient development process.

## Technologies used
The project utilizes a variety of libraries and tools to achieve its functionality. The core technologies are Node.js and Express.js, which are used to build the backend of the application, providing routing and middleware capabilities. For managing environment variables securely, the dotenv library is employed. bcrypt is used for hashing passwords before storing them in the database, ensuring data security. To implement token-based authentication for user sessions, the application uses JSON Web Tokens (JWT). Nodemailer is integrated to allow the app to send emails, such as registration confirmations and password resets. Authentication can be handled with Passport as well, a middleware that supports both local strategies and OAuth. 

## Database
The application is connected to a MongoDB Atlas database, using the Mongoose library to define models and interact with the database. MongoDB Atlas provides a cloud-based database solution that is both scalable and secure.

## Documentation
The project is thoroughly documented. The JavaScript portions of the project are documented using JSDoc, while the TypeScript portions of the project are documented using TSDoc. A web-based documentation site was generated using the Docdash theme, providing easy access to the details of the JavaScript codebase. The TypeScript documentation is generated using TypeDoc, which reads the TSDoc comments and also produces a comprehensive web-based documentation site.
