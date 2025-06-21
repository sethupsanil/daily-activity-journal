import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getTagsAndMoodFromAI(text) {
  const prompt = `
Analyze the following journal entry and return a JSON with the user's emotional mood and relevant tags:

Entry:
"${text}"

Respond in this format:
{
  "mood": "<one-word-mood>",
  "tags": ["<tag1>", "<tag2>", ...]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const jsonStr = response.choices[0].message.content.trim();
  return JSON.parse(jsonStr);
}
