# React File Upload App

This is a simple React application that allows users to upload files.

## Architecture

This application is built using AWS services - API Gateway, Lambda, and S3.

- **API Gateway**: We have set up an API Gateway to handle the HTTP requests from our React application. The API Gateway routes the incoming requests to the appropriate Lambda function.

- **Lambda**: We have a Lambda function that is triggered by the API Gateway. This function is responsible for generating a presigned URL for uploading a file to S3.

```
import json
import boto3
import os

def lambda_handler(event, context):
    s3 = boto3.client('s3')

    # Catch the name of the file from the event or give a default name
    file_name = event['queryStringParameters'].get('file_name', 'default_name')

    # Create the presigned URL
    try:
        presigned_url = s3.generate_presigned_url('put_object',
                                                  Params={'Bucket': os.environ['BUCKET_NAME'],
                                                          'Key': file_name},
                                                  ExpiresIn=3600) # URL valide pour 1 heure
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",  # À remplacer par l'origine spécifique en production
                "Access-Control-Allow-Methods": "OPTIONS,GET,PUT",  # Les méthodes HTTP autorisées
                "Access-Control-Allow-Headers": "Content-Type"  # Les en-têtes autorisés
            },
            'body': json.dumps(f"Errore with presigned URL: {str(e)}")
        }

    # Return presigned URL with headers CORS
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET,PUT",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        'body': json.dumps({'url': presigned_url})
    }
```

- **S3**: We use an S3 bucket (private) to store the uploaded files. The files are uploaded directly to S3 from the client-side application using the presigned URL.

## Features

- File selection
- File upload with progress tracking
- Display of upload status messages

## Installation with node

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

