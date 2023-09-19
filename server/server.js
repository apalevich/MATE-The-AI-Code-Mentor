const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// TODO: Ensure you add the backend URL to the CORS whitelist for your Express.js server.
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  res.json({text: 'It works!'})
});

app.post('/health', async (req, res) => {
  const { text, name } = req.body;
  if (text && name) {
    res.json({text: 'your code have bee successfully received'})
  }
  res.json({text: 'there is a problem in your request' })
})

app.post('/analyze', async (req, res) => {
  const { text, name } = req.body;

  try {
    const apiResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: codeContent,
      // Any other API parameters
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      }
    });

    res.json({ result: apiResponse.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).send("Error communicating with OpenAI API");
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
