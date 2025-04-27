# hmcts-dev-test-submission
Submission for Carter Bartlett for the role of Junior Software Developer using the [HMCTS DTS Developer Challenge](https://github.com/hmcts/dts-developer-challenge)

## How do I run this?

Ensure environment variables are either passed through, or set in `./backend/.env` and `./frontend.env`. Then run `npm run start--dev`

## How was this built?

In an attempt to provide some insight into how this was built, as well as potentially to provide some education on how to build such applications in the future. This readme.md also provides information as to how the decisions were made.

### Basic Structure

This application has been configured to be a decouple frontend-backend structure application. This is to both allow simpler development and best practices, but also, to allow for potential upgradability in the future as the frontend and the backend is able to be swapped out _(for example, if you decide the backend does not run fast enough on NodeJS for a specific purpose, such as big-data, then you would be able to swap it out for something like Rust)_

### Project Root

Project root is used solely to boot up the frontend and backend seperately (for the purposes of development), or to boot up the backend and ensure that the frontend is packaged and able to be served by the frontend. The `package.json` here is expected to be very small and may only contain a few development packages, such as [concurrently](https://www.npmjs.com/package/concurrently).

### Backend

For the backend, the tool [Express Generator](https://expressjs.com/en/starter/generator.html) was utilised in order to set up some basic boilerplate for the application. Running this tool with the `--no-view` command reduces the amount of boilerplate that needs to be stripped away. The backend in this application is purely for data purposes, and so, we can remove any CSS styling. Once cleaned up, a basic express application provides an incredibly useful foundation which will allow us to take advantage of concepts such as middlewares and routing to keep our application clean and efficient, while also making it much more enjoyable to work within due to key parts being isolated (you should be able to find the routes very easily for example!).

[PassportJS](https://www.passportjs.org/) has been used extensively to simplify the authentication flow. A major reason this package in particular is used is to allow for authentication via other means (such as OAuth via Google or LinkedIn) in the future.

[Mongoose](https://mongoosejs.com/) is used as a database ODM (object-document mapper) for this project. By managing our mongoDB with Mongoose rather than directly we are able to access a lot of additional useful functionality such as pre-save hooks, to apply a schema to data to ensure it remains consistent within the database, and to simplify the process of working with the database by building models that can then be used across the entire application, with specific functionality added to each model such as a function to verify password hashes for the user model, or to omit key information which should not be exposed (such as password hashes).