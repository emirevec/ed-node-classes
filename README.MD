# Node.js MVC Integrative Project

## Table of contents

- [Project description](#project-description)
- [Core languages](#core-languages)
  - Javascript and Typescript
- [Addittional technologies used](#addittional-technologies-used)
  - Express.js
  - dotenv / bcrypt / JWT / Passport / OAuth / nodemailer / debug
  - Handlebars / Bootstrap
- [Databases](#database)
  - MongoDB Atlas
  - Azure-hosted MSSQL
- [Documentation](#Documentation)
  - JSDoc / Docdash theme
  - TSDoc / TypeDoc

## Project description

This repository contains the final project for my Node.js course, where we developed a full-featured e-commerce application using the Model-View-Controller (MVC) architecture. The project focuses on the creation, retrieval, updating, and deletion (CRUD) of both user and product data. It leverages several powerful Node.js libraries and utilizes a dual-database architecture, connecting to both a MongoDB Atlas database and an Azure-hosted MSSQL database.

## Core languages

This project was initially developed in JavaScript, taking advantage of its flexibility and simplicity to quickly build out the core features. As the project evolved, it was upgraded to TypeScript. This transition was made to introduce static typing, which helps catch errors at compile-time, improve code clarity, and enhance maintainability. The use of TypeScript also facilitated better tooling and editor support, contributing to a more efficient development process.

## Additional technologies used

The project utilizes a variety of libraries and tools to achieve its functionality. The core technologies are Node.js and Express.js, which are used to build the backend of the application, providing routing and middleware capabilities. For managing environment variables securely, the dotenv library is employed. bcrypt is used for hashing passwords before storing them in the database, ensuring data security. To implement token-based authentication for user sessions, the application uses JSON Web Tokens (JWT). Nodemailer is integrated to allow the app to send emails, such as registration confirmations and password resets. Authentication can be handled with Passport as well, a middleware that supports both local strategies and OAuth. Although the main focus of the project is on the backend, the view layer was constructed using Handlebars, a simple templating engine for rendering HTML pages. Additionally, Bootstrap is employed to style these pages, ensuring a responsive and visually appealing design. For debugging purposes, the debug library is used to provide flexible and customizable logging throughout the application, helping to monitor and troubleshoot various aspects of the codebase.


## Databases

The application utilizes a dual-database architecture, connecting to both a MongoDB Atlas database and an Azure-hosted MSSQL database.

>
>### MongoDB Atlas
>
>For our NoSQL needs, the application is connected to a MongoDB Atlas database. We use the Mongoose ODM (Object-Document Mapping) library to define models and interact with MongoDB. 
>
>### Azure MSSQL
>
>For our relational data, the application connects to an MSSQL database hosted on Azure. We leverage the Sequelize ORM (Object-Relational Mapping) library to define models and manage interactions with the MSSQL database. 
>
>This setup allows the application to efficiently manage both structured and unstructured data, making use of the strengths of each database type.
>

## Documentation

The project is thoroughly documented. The JavaScript portions of the project are documented using JSDoc, while the TypeScript portions of the project are documented using TSDoc. A web-based documentation site was generated using the Docdash theme, providing easy access to the details of the JavaScript codebase. The TypeScript documentation is generated using TypeDoc, which reads the TSDoc comments and also produces a comprehensive web-based documentation site.


>
> To view the full content of this and other courses, you can visit the [EducacionIT website](https://educacionit.com.ar)
>
