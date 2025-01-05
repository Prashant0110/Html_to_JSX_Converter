# HTML to JSX Converter API

This is a simple Express server that converts HTML to JSX format. You can provide either a URL to fetch HTML or raw HTML text, and the server will return the converted JSX.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node package manager)

### Installation

1. Clone the repository or create a new directory for your project.
2. Navigate to the project directory.
3. Install the required packages:

   ```bash
   npm install express axios cors
   ```

### Running the Server

To start the server, run:

```
npm start
```

The server will be running on `http://localhost:3000`.

### API Endpoint

#### Convert HTML to JSX

- **URL**: `POST /convert`
- **Request Body**: JSON object containing either `url` or `html`.

### Example Request Using Postman

1. Open Postman.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:3000/convert`.
4. In the Body tab, select `raw` and set the type to `JSON`.
5. Use the following JSON for the request body:

```json
{
  "html": "<div class=\"cod\"> Hello </div>"
}
```

6. Click `Send`.

### Testing with a Sample URL

You can test the API with a sample HTML page. For example, you can use:

```json
{
  "url": "https://www.w3schools.com/html/html_examples.asp"
}
```

This will fetch the HTML from the provided URL and convert it to JSX.

### License

This project is licensed under the MIT License.
