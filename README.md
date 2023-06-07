<h1 style='text-align: center'>Image Service</h1>
<p style='text-align: center'>Service for CRUD functions for images saved in local storage and access to it via endpoint. Made using MongoDB.</p>

<div style='text-align: center'>
<img src="https://img.shields.io/static/v1?label=version&message=v.1.0.0&style=plastic&color=7159c1"/>
<img src="https://img.shields.io/static/v1?label=coverage&message=96%&style=plastic&color=7159c1"/>
<a href='https://github.com/Bse-B2c/rating-service/blob/main/LICENSE'><img src="https://img.shields.io/static/v1?label=license&message=MPL 2.0&style=plastic&color=7159c1&"/>
</a>
<a href='https://nodejs.org/en/'><img src="https://img.shields.io/static/v1?label=Node version&message= >=14.21.3&style=plastic&color=7159c1&logo=nodedotjs"/>
</a>
<a href='https://www.mongodb.com/docs/'><img src="https://img.shields.io/static/v1?label=MongoDB version&message=3.6&style=plastic&color=7159c1&logo=mongodb"/>
</a>
</div>

### Prerequisites

Before you begin, make sure you have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/docs/).

### Getting Started

```bash
# Clone this repository
$ git clone <https://github.com/Bse-B2c/image-service.git>

# Access the project folder in the terminal/cmd
$ cd image-service

# Install the dependencies
$ npm install
```

Before starting the service, it's important to create the .env file. You can find the default file [here](https://github.com/Bse-B2c/image-service/blob/main/.default.env).

```bash
# Run the application in development mode
$ npm run start:dev
```