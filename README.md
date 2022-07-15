# node-email-sender
node email sender with nodemailer and hbs

## this repository contains code for the backend of an application, titled the "comrade", a comrade is a person who is part of a larger group of persons agitating for a better course,

on registering in the frontend, the application sends the comrade data to the backend which is powered by node, if the comrade already exist in the database it will throw an error, but if it doesn't it will register the comrade and then send the newly register comrade a mail, welcoming him or her to the group.

to register send the following data to the backend: firstName: String, lastName: String, gender: String, occupation: String: String, mobile: Number, email: String, age: Number, subscribe: Boolean, state: String, lga: String.

here is the mail it sent to the registered comrade.
![image of email sent by nodemailer](https://github.com/davidalimazo/node-email-sender/blob/main/image.png?raw=true)
