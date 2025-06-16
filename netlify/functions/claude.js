const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST allowed" }),
    };
  }
  const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No VITE_ANTHROPIC_API_KEY in env!" }),
    };
  }

  const body = JSON.parse(event.body || "{}");
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Give me a recipe using only these ingredients: ${body.ingredients?.join(", ")}. Respond with only the recipe, no comments.`
        }
      ]
    }),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Invalid JSON from Claude", details: text }),
    };
  }
  if (data?.content && Array.isArray(data.content) && data.content[0]?.text) {
    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: data.content[0].text }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
};