import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";

// Încarcă .env.local dacă există, altfel .env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/claude", async (req, res) => {
  try {
    const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("Nu există VITE_ANTHROPIC_API_KEY în env!");
      return res.status(500).json({ error: "Nu există VITE_ANTHROPIC_API_KEY în env!" });
    }

    console.log("Request body primit de la frontend:", req.body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307", // <--- aici e modificarea!
        max_tokens: 1024,
        messages: [
          {
            "role": "user",
            "content": `Give me a recipe using only these ingredients: ${req.body.ingredients?.join(", ")}. Respond with only the recipe, no comments.`
          }
        ]
      }),
    });

    const text = await response.text();
    console.log("Răspuns brut de la Claude:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(502).json({ error: "Invalid JSON from Claude", details: text });
    }

    if (data?.content && Array.isArray(data.content) && data.content[0]?.text) {
      res.json({ recipe: data.content[0].text });
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error("=== Proxy error: ", err);
    res.status(500).json({ error: "Proxy error", details: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
  if (!process.env.VITE_ANTHROPIC_API_KEY) {
    console.warn("ATENȚIE: VITE_ANTHROPIC_API_KEY nu este setat! Vezi .env.local");
  }
});