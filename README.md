# React File Upload App

This is a simple React application that allows users to upload files.

## Architecture

This application is built using AWS services - API Gateway, Lambda, and S3.

- **API Gateway**: We have set up an API Gateway to handle the HTTP requests from our React application. The API Gateway routes the incoming requests to the appropriate Lambda function.

- **Lambda**: We have a Lambda function that is triggered by the API Gateway. This function is responsible for generating a presigned URL for uploading a file to S3.

- **S3**: We use an S3 bucket to store the uploaded files. The files are uploaded directly to S3 from the client-side application using the presigned URL.

## Features

- File selection
- File upload with progress tracking
- Display of upload status messages

## Installation

1. Clone this repository.
2. Run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root directory of the project and add the following variable: `REACT_APP_API_URL=<your-api-url>`.
4. Run `npm start` to start the application.

## Usage

1. Select a file to upload using the file input.
2. Click the "Upload File" button to upload the file.
3. The upload progress will be displayed on the page.
4. Once the upload is complete, a success message will be displayed. If an error occurs during the upload, an error message will be displayed.

## Dependencies

- React
- Axios

