import { Configuration, OpenAIApi } from 'openai';
import * as tunnel from 'tunnel';

export const askAIQuestion = async (
  question: string,
  type?: 'title' | 'word' | 'classify',
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
      case 'classify':
        prompt = tagClassifyPrompt(question);
        break;
      default:
        prompt = generatePrompt(question);
    }
    const temperature = 0.7;
    const max_tokens = 256;
    const top_p = 1;
    const frequency_penalty = 1;
    const presence_penalty = 0;
    const completion = await openai.createCompletion(
      {
        model: 'text-davinci-003',
        prompt,
        temperature,
        max_tokens,
        top_p,
        frequency_penalty,
        presence_penalty,
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
    switch (type) {
      case 'title':
        return { result: completion.data.choices[0].text.split('/') };
      case 'word':
        return { result: JSON.parse(completion.data.choices[0].text) };
      case 'classify':
        return { result: completion.data.choices[0].text.split('、') };
      default:
        return { result: completion.data.choices[0].text };
    }
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    console.log(error);
    return { message: 'An error occurred during your request.' };
  }
};

const generatePrompt = (question: string) => {
  return question;
};

const createTitlePrompt = (content: string) => {
  const prompt = `请按照格式生成吸引人的文章标题。
  注意：四个标题字数范围都是十二到十六字! 
  例：食品检出核酸阳性具有传染性吗？专家这样说!
  输入:"""文章内容"""
  输出:xxx：xxx？/xxx？xxx！/xxx，xxx！/xxx，xxx
  输入:"""${content}"""
  输出:`;
  return prompt;
};

const wordReplacementPrompt = (content: string) => {
  const prompt = `请按格式修改部分词语短句，润色输入的文章，不需要输出修改后的文章
  输入: """文章内容"""
  输出: [{"before": "aa", "after": "bb"}]
  输入:"""${content}"""
  输出:...`;
  return prompt;
};

const tagClassifyPrompt = (content: string) => {
  const prompt = `""" 
  ${content}
   """
  根据该文章的内容帮我生成几个文章标签,字数要求3到5个字，以顿号分隔：`;
  return prompt;
};
