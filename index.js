require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

const PORT = process.env.PORT || 3000;

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', cors({ origin: "*" }), function (req, res) { res.send('Eric Echemane OpenAI Completer'); });

app.post('/complete', cors({ origin: "https://enginex.vercel.app" }), async (req, res) => {
    const { query } = req.body;
    const response = await openai.createCompletion("text-davinci-001", {
        prompt: query,
        temperature: 0,
        max_tokens: 966,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    console.log(response.data);
    res.send(response.data);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));