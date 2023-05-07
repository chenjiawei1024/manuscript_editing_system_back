import { Configuration, OpenAIApi } from 'openai';
import * as tunnel from 'tunnel';

export const askAIQuestion = async (
  question: string,
  type?: 'title' | 'word' | 'typo',
) => {
  // 创建openaiAPI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  if (!configuration.apiKey) {
    return {
      message:
        'OpenAI API key not configured, please follow instructions in README.md',
    };
  }
  try {
    let prompt = question;
    switch (type) {
      case 'title':
        prompt = createTitlePrompt(question);
        break;
      case 'word':
        prompt = wordReplacementPrompt(question);
        break;
      case 'typo':
        prompt = typoCorrectionPrompt(question);
        break;
      default:
        prompt = generatePrompt(question);
    }
    const completion = await openai.createCompletion(
      {
        model: 'text-davinci-003',
        prompt,
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
    console.log(completion.data.choices[0].text);
    return { result: completion.data.choices[0].text };
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    return { message: 'An error occurred during your request.' };
  }
};

const generatePrompt = (question: string) => {
  return question;
};

const createTitlePrompt = (content: string) => {
  return content;
};

const wordReplacementPrompt = (content: string) => {
  return content;
};

const typoCorrectionPrompt = (content: string) => {
  const prompt = `""" 
  ${content}
  """
  请通过修改部分词句，润色这篇文章。输出格式为可以被解析的json对象，例: [{before: 'a', after: 'b'}]`;
  return prompt;
};
