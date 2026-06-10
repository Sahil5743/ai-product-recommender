# AI Product Recommender

A React application that uses the **Anthropic Claude API** to recommend products from a catalog based on natural language user input.

## Features

- 14-product catalog across phones, laptops, headphones, and smartwatches
- Natural language preference input (e.g. "phone under $500 with a great camera")
- Claude-powered AI that reads the full catalog and picks the best matches
- Live product highlighting with a short reason per match
- Category filtering + "matches only" toggle
- Quick-prompt chips for common queries
- Responsive layout (mobile stacks to single column)

---

## Project Structure

```
ai-product-recommender/
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite bundler config
├── package.json
├── .env.example                   # Copy to .env and add your API key
├── .gitignore
└── src/
    ├── main.jsx                   # React root
    ├── App.jsx                    # Root layout + state
    ├── App.module.css
    ├── index.css                  # Global CSS variables + reset
    ├── data/
    │   └── products.js            # Product catalog + quick prompts
    ├── hooks/
    │   └── useRecommendations.js  # Anthropic API integration
    └── components/
        ├── ProductCatalog.jsx     # Left panel: filtered product list
        ├── ProductCatalog.module.css
        ├── ProductCard.jsx        # Single product card
        ├── ProductCard.module.css
        ├── ChatPanel.jsx          # Message thread display
        ├── ChatPanel.module.css
        ├── ChatInput.jsx          # Input bar + quick prompts
        └── ChatInput.module.css
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your API key

```bash
cp .env.example .env
```

Edit `.env` and paste your Groq API key:

```
VITE_GROQ_API_KEY=gsk_...
```

Get a key at [https://console.groq.com/](https://console.groq.com/)

### 3. Run in development

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve with:

```bash
npm run preview
```

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Set `VITE_ANTHROPIC_API_KEY` in **Project → Settings → Environment Variables**.

### Netlify

```bash
npm run build
# drag-and-drop the dist/ folder at app.netlify.com
```

Set the env var in **Site settings → Environment variables**.

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t ai-product-recommender .
docker run -p 8080:80 ai-product-recommender
```

---

## How It Works

1. **User types** a natural language preference in the chat input.
2. The full product catalog is embedded into the **Claude system prompt**.
3. **`useRecommendations` hook** sends the user query + catalog to `claude-sonnet-4-20250514` via the Anthropic Messages API.
4. Claude returns a **structured JSON** response: `{ message, recommendations: [{ id, reason }] }`.
5. The app **parses the JSON**, displays the AI message, and highlights matched products with reasons.

---

## Customizing Products

Edit `src/data/products.js` to add, remove, or modify products. Each product needs:

```js
{
  id: number,         // unique
  name: string,
  category: string,
  brand: string,
  price: number,      // USD
  tags: string[],     // searchable features
  description: string
}
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, CSS Modules |
| Bundler | Vite 5 |
| AI | Anthropic Claude (claude-sonnet-4-20250514) |
| Fonts | Space Grotesk, Inter (Google Fonts) |

---

## Security Note

This project calls the Anthropic API directly from the browser using `anthropic-dangerous-direct-browser-access: true`. This is fine for demos and take-home assignments. For production, proxy the API call through your own backend to keep the key secret.
