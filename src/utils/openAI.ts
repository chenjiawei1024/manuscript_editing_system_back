import { Configuration, OpenAIApi } from 'openai';
import * as tunnel from 'tunnel';

export const askAIQuestion = async (question: string) => {
  // 创建openaiAPI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY_2,
  });
  const openai = new OpenAIApi(configuration);
  console.log(configuration);
  if (!configuration.apiKey) {
    return {
      message:
        'OpenAI API key not configured, please follow instructions in README.md',
    };
  }
  try {
    console.log(question);
    const completion = await openai.createCompletion(
      {
        model: 'text-davinci-003',
        prompt: generatePrompt(question),
        temperature: 0.6,
      },
      {
        httpsAgent: tunnel.httpsOverHttp({
          proxy: {
            host: '127.0.0.1',
            port: 58591,
          },
        }),
      },
    );
    return { result: completion.data.choices[0].text };
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    // Consider adjusting the error handling logic for your use case
    return { message: 'An error occurred during your request.' };
  }
};

function generatePrompt(question: string) {
  return question;
}
