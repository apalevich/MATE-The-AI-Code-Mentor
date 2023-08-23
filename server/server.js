const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// TODO: Ensure you add the backend URL to the CORS whitelist for your Express.js server.
app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const codeContent = req.body.code;

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
