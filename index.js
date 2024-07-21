const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

// Configure CORS to allow requests from your domain
app.use(cors({
  origin: 'http://www.lukaskubiena.com', // Replace with your actual domain
  credentials: true, // If you need to allow credentials (cookies, authorization headers, etc.)
}));

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate-response', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
