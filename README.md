# Boulder MCP Demo

A prototype web app demonstrating how to connect a bouldering centre finder service to AI assistants via the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/).

Built with Next.js, Clerk for authentication, and the MCP TypeScript SDK.

---

## Purpose

This app lets you test the full journey:

1. Sign in via Clerk auth.
2. View a bouldering centre dashboard.
3. Connect an AI assistant (e.g. ChatGPT) to the MCP endpoint at `/mcp`.
4. The AI can call tools like `get_best_centre` and `get_second_best_centre` using hardcoded demo data.

No real database, payments, or external APIs are used. This is a learning prototype only.

---

## Local Setup

### 1. Clone and install

```bash
npm install
```

### 2. Set up Clerk

1. Create a free account at [clerk.com](https://clerk.com).
2. Create a new application in the Clerk dashboard.
3. Copy your API keys.

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Clerk keys:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Add the environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` — set to your Vercel deployment URL (e.g. `https://boulder-mcp-demo.vercel.app`)
4. Deploy.

Also add your Vercel deployment URL to the Clerk dashboard under **Allowed origins / redirect URLs**.

---

## MCP Endpoint

The MCP server is exposed at:

```
https://YOUR_DEPLOYED_DOMAIN/mcp
```

### Available tools

| Tool | Description |
|---|---|
| `get_best_centre` | Returns the top-ranked bouldering centre |
| `get_second_best_centre` | Returns the second-ranked bouldering centre |
| `list_recommended_centres` | Returns all centres in ranked order |

---

## How to test with ChatGPT Developer Mode

1. Deploy this app to Vercel.
2. Copy the deployed MCP endpoint:
   ```
   https://YOUR_DEPLOYED_DOMAIN/mcp
   ```
3. In ChatGPT web, open **Settings**.
4. Go to **Connectors / Apps & Connectors**.
5. Enable Developer Mode if needed.
6. Create a new custom MCP connector.
7. Name it: `Boulder MCP Demo`
8. Paste the MCP endpoint URL.
9. Choose **no authentication** for this prototype.
10. Save the connector.
11. Start a new chat and add the Boulder MCP Demo connector.
12. Ask:
    ```
    Using Boulder MCP Demo, what is the best bouldering centre for Fred?
    ```
    ```
    Using Boulder MCP Demo, what is the second best centre?
    ```
    ```
    Using Boulder MCP Demo, list all recommended bouldering centres in order.
    ```

Expected result: ChatGPT calls the MCP tools and answers using the hardcoded demo data.
