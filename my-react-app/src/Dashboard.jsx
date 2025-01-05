import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const [jsxOutput, setJsxOutput] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false); // For feedback after copying

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setJsxOutput("");

    try {
      const response = await axios.post("http://localhost:3000/convert", {
        url: url || undefined,
        html: html || undefined,
      });
      setJsxOutput(response.data.jsx);
    } catch (error) {
      setError("An error occurred while fetching the JSX.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsxOutput);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset the copy feedback after 2 seconds
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        HTML to JSX Converter
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter URL"
          />
        </div>
        <div>
          <label className="block mb-2">Raw HTML:</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter raw HTML"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full sm:w-auto"
        >
          Convert
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {jsxOutput && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Converted JSX:</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            {/* Ensure the JSX code is scrollable horizontally and word-wrapped */}
            <pre className="whitespace-pre-wrap break-words">{jsxOutput}</pre>
          </div>
          <button
            onClick={handleCopy}
            className="mt-2 bg-green-500 text-white rounded p-2 w-full sm:w-auto"
          >
            {copySuccess ? "JSX copied!" : "Copy JSX"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
