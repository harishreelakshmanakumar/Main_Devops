const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/get-recipe", async (req, res) => {
  const { ingredients } = req.body;

  const prompt = `I have the following ingredients: ${ingredients}. Suggest a recipe using them with clear Ingredients and Step-by-step Instructions. Format it like:
  
  Recipe Name:
  Ingredients:
  -
  -
  Instructions:
  1.
  2.    if its is in jsx tage it will be usefull only give response`;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        },
      }
    );
    console.log(response);
    res.json({ recipe: response.data[0].generated_text });
  } catch (error) {
    console.error("Error fetching from Hugging Face:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
