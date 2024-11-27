const express = require('express');
const corsMiddleware = require('./middleware/cors'); // Import CORS middleware
const axios = require('axios');
const next = require('next');
const app = express();

// Apply CORS middleware globally
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json());

// Initialize Next.js
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();

// Define API route
app.post('/api/sendToGemini', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.gemini.com/v1/chat', {
      model: 'gemini-4',
      prompt: message,
      api_key: process.env.GEMINI_API_KEY,
      temperature: 0.5,
      stream: true,
    });

    let result = '';
    for (const chunk of response.data.choices) {
      if (chunk.delta && chunk.delta.content) {
        result += chunk.delta.content;
      }
    }

    res.json({ reply: result });
  } catch (error) {
    console.error('Error interacting with Gemini API:', error.message);
    res.status(500).json({ error: 'Network error: Could not reach Gemini API' });
  }
});

// Serve Next.js pages
app.all('*', (req, res) => {
  return handle(req, res);
});

// Start the server
app.listen(3000, (err) => {
  if (err) throw err;
  console.log('> Ready on http://localhost:3000');
});
