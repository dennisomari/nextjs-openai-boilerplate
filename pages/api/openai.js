import { Configuration, OpenAIApi } from "openai";
import { getUserPrompt, getFunctions } from "../../prompts/promptUtils";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!configuration.apiKey) {
    return res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
  }

  const userMessage = req.body.payload || "";

  try {
    const userPrompt = getUserPrompt(userMessage);
    const functions = getFunctions();
    const messages = [userPrompt];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages,
      functions,
      temperature: 1,
      max_tokens: 510,
      top_p: 0,
    });

    const promptResult = completion.data.choices[0].message.content || ""; // Extract the prompt result from the completion
    console.log("Prompt result:", promptResult); // Log the prompt result

    const resultContent = completion.data.choices[0].message.function_call.arguments;
    console.log("Data from OpenAI API:", resultContent); // Log the data from OpenAI API

    try {
      const jsonResult = JSON.parse(resultContent);
      console.log("Parsed JSON result:", jsonResult); // Log the parsed JSON result
      const name = jsonResult.name || ""; // Get the name from the result or set it to an empty string if not present
      const characteristics = jsonResult.characteristics || ""; // Get the characteristics from the result or set it to an empty string if not present
      return res.status(200).json({ name, characteristics, promptResult, rawResponse: completion.data }); // Include the name, characteristics, prompt result, and raw response from OpenAI API
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return res.status(500).json({ error: { message: "Failed to parse JSON response." } });
    }
  } catch (error) {
    if (error.response) {
      console.error("OpenAI API response error:", error.response.status, error.response.data);
      return res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error with OpenAI API request:", error.message);
      return res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
