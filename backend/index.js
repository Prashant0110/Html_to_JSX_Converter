const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors()); // This allows all origins by default

// Middleware to parse JSON requests
app.use(express.json());

// Function to convert HTML to JSX
function convertHtmlToJsx(html) {
  return html.replace(/class="/g, 'className="').replace(/for="/g, 'htmlFor="');
}

// Endpoint to convert HTML from URL or raw HTML text
app.post("/convert", async (req, res) => {
  const { url, html } = req.body;

  try {
    let htmlContent;

    // If a URL is provided, fetch the HTML
    if (url) {
      const response = await axios.get(url);
      htmlContent = response.data;
    } else if (html) {
      htmlContent = html;
    } else {
      return res
        .status(400)
        .json({ error: "Please provide either a URL or raw HTML text." });
    }

    // Convert HTML to JSX
    const jsx = convertHtmlToJsx(htmlContent);
    res.json({ jsx });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
