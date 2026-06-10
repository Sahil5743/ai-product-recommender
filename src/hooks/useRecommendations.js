import { useState, useCallback } from "react";
import { PRODUCTS } from "../data/products";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Groq model to use — llama-3.3-70b is fast, smart, and free-tier friendly
const MODEL = "llama-3.3-70b-versatile";

/**
 * Build a catalog string to pass into the AI system prompt.
 */
function buildCatalog() {
  return PRODUCTS.map(
    (p) =>
      `ID:${p.id} | ${p.name} | $${p.price} | Category:${p.category} | Brand:${p.brand} | Tags:${p.tags.join(", ")} | ${p.description}`
  ).join("\n");
}

/**
 * @typedef {Object} Recommendation
 * @property {number} id
 * @property {string} reason
 */

/**
 * @typedef {Object} AIResponse
 * @property {string} message
 * @property {Recommendation[]} recommendations
 */

/**
 * Custom hook that handles communication with the Groq API
 * (OpenAI-compatible) to generate product recommendations.
 */
export function useRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * @param {string} userQuery
   * @returns {Promise<AIResponse | null>}
   */
  const getRecommendations = useCallback(async (userQuery) => {
    if (!userQuery.trim()) return null;
    if (!API_KEY || API_KEY === "your_groq_api_key_here") {
      setError("Please set VITE_GROQ_API_KEY in your .env file. Get one free at console.groq.com");
      return null;
    }

    setIsLoading(true);
    setError(null);

    const systemPrompt = `You are a smart, helpful product recommendation assistant.
Given the user's request, recommend the most relevant products from the catalog below.

PRODUCT CATALOG:
${buildCatalog()}

INSTRUCTIONS:
- Recommend between 1 and 4 products that best match the user's request.
- Consider price constraints, category preferences, brand preferences, and feature needs.
- Respond ONLY with a valid JSON object — no markdown fences, no preamble, no extra text.

RESPONSE FORMAT:
{
  "message": "A friendly 1–2 sentence summary of your picks and why.",
  "recommendations": [
    { "id": <number>, "reason": "<max 6-word phrase explaining the match>" }
  ]
}`;

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1000,
          // Groq supports response_format for guaranteed JSON output
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuery },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();

      // Groq uses the OpenAI response format: choices[0].message.content
      const rawText = data?.choices?.[0]?.message?.content || "";
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed.message || !Array.isArray(parsed.recommendations)) {
        throw new Error("Unexpected response format from AI.");
      }

      return parsed;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getRecommendations, isLoading, error };
}
