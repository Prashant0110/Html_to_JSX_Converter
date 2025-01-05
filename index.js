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
  // Convert class="..." to className="..."
  html = html.replace(/class="/g, 'className="');

  // Convert for="..." to htmlFor="..."
  html = html.replace(/for="/g, 'htmlFor="');

  // Convert inline event handlers like onclick="..." to onClick={...}
  html = html.replace(/\s(on\w+)="([^"]+)"/g, (match, p1, p2) => {
    return ` ${p1}={${p2}}`;
  });

  // Convert style="..." to style={{...}}
  html = html.replace(/style="([^"]+)"/g, (match, p1) => {
    // Convert inline styles to object syntax
    const styleObj = p1
      .split(";")
      .filter(Boolean)
      .map((style) => {
        const [key, value] = style.split(":").map((str) => str.trim());
        return `${key}: '${value}'`;
      })
      .join(", ");
    return `style={{${styleObj}}}`;
  });

  // Ensure self-closing tags are properly closed in JSX
  html = html.replace(/<([a-zA-Z0-9]+)([^>]*)>/g, (match, tag, attrs) => {
    const selfClosingTags = [
      "input",
      "img",
      "br",
      "hr",
      "link",
      "meta",
      "area",
      "base",
      "col",
      "source",
      "track",
      "source",
      "img",
      "embed",
      "param",
      "colgroup",
      "command",
      "keygen",
      "progress",
      "output",
    ];
    // Handling self-closing tags
    if (selfClosingTags.includes(tag)) {
      return `<${tag}${attrs} />`;
    }
    return `<${tag}${attrs}>`;
  });

  // Handle boolean attributes (e.g., disabled, checked, etc.)
  html = html.replace(
    /(\s(?:disabled|checked|selected|readonly|multiple|required|autofocus|autoplay|loop|muted|controls))="[^"]*"/g,
    (match, p1) => {
      return p1; // Just remove the value and keep the attribute
    }
  );

  // Handle empty attributes like href="#" and avoid it in JSX
  html = html.replace(/href="\s*#\s*"/g, 'href="#"');

  // Handle text nodes and escape sequences
  html = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

  return html;
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
