# e-commerce-admin

This is a full stack application for an e-commerce operational control panel!

## About this Project

The idea of the App is:

Put into practice all the programming knowledge I've gained so far and create a functional product.

## Functionalities

- Product registration
    - Create/edit or delete a product
    - Add category to the product
    - Add images of the product
    - Add price and description to a product
  
- Category creation
    - Creta/ edit or delete a category
    - A category can have multiple category "fathers"

- Show all products registered in a list
- Show all categories registered in a list

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a Next JS APP.

Also create a .env file that conteins your MongoDB URI (used in database/lib/mongoose.ts as mongoUri) and the accses information to your S3 Cliente (used in pages/api/upload.ts as accessKeyId and secretAccessKey).

**Cloning the Repository**

```
$ git clone https://github.com/felipeJJ/e-commerce-admin.git

$ cd e-commerce-admin
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Running

With all dependencies installed and the environment properly configured, you can now run the app:

```
$ npm run dev
```

## Built With

- [Next JS](https://nextjs.org) - Front-end framework 
- [typescript](https://www.typescriptlang.org) - Add types to JS
- [tailwindcss](https://tailwindcss.com) - Create all the stylization
- [axios](https://axios-http.com) - Used to make HTTP requests
- [mongodb](https://www.mongodb.com) - Data base
- [mongoose](https://mongoosejs.com) - Create schema-based solution to model your application data
- [multiparty](https://github.com/pillarjs/multiparty) - Parse http requests with content-type
- [react-sortablejs](https://github.com/SortableJS/react-sortablejs#readme) - Used to put the images in a chosen order
- [react-spinners](https://www.davidhu.io/react-spinners/) - Animation used on the load of the images 
- [mime-types](https://github.com/jshttp/mime-types#readme) - The ultimate javascript content-type utility
- [react-sweetalert2](https://github.com/kessejones/react-sweetalert2#readme) - Used to show a pop-up box when deleting items
- [eslint](https://eslint.org) - Linter

## Support tools

- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

### Some Observations about this App

This is an MVP and lacks features that will be implemented in the future, such as the dashboard.
