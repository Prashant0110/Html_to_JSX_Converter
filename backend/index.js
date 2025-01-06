const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function convertHtmlToJsx(html) {
  html = html.replace(/class="/g, 'className="');
  html = html.replace(/for="/g, 'htmlFor="');
  html = html.replace(/\s(on\w+)="([^"]+)"/g, (match, p1, p2) => {
    return ` ${p1}={${p2}}`;
  });
  html = html.replace(/style="([^"]+)"/g, (match, p1) => {
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
    if (selfClosingTags.includes(tag)) {
      return `<${tag}${attrs} />`;
    }
    return `<${tag}${attrs}>`;
  });
  html = html.replace(
    /(\s(?:disabled|checked|selected|readonly|multiple|required|autofocus|autoplay|loop|muted|controls))="[^"]*"/g,
    (match, p1) => {
      return p1;
    }
  );
  html = html.replace(/href="\s*#\s*"/g, 'href="#"');
  html = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
  return html;
}

app.post("/convert", async (req, res) => {
  const { url, html } = req.body;

  try {
    let htmlContent;

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

    const jsx = convertHtmlToJsx(htmlContent);
    res.json({ jsx });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
