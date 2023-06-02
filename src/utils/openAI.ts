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
        return {
          result: JSON.parse(filterJSON(completion.data.choices[0].text)),
        };
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

export const askAICreateImg = async (content: string) => {
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
    const prompt = imgCreationPrompt(content);
    console.log(prompt);
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
    const img_tag = completion.data.choices[0].text;
    console.log(img_tag);
    return img_tag;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    console.log(error);
    return { message: 'An error occurred during your request.' };
  }
};

// const generatePrompt = (question: string) => {
//   return question;
// };
const generatePrompt = (question: string) => {
  const prompt = `请你充当一名新闻稿件编辑专家，回答下面用户输入的关于写稿知识相关的问题，字数不超过200字
  注意： 如果用户提问的内容与写稿知识无关，则直接返回"对不起，我只能回答写稿相关的问题"
  问题："""${question}"""
  回答：`;
  return prompt;
};

const createTitlePrompt = (content: string) => {
  const prompt = `请你充当一名新闻稿件编辑专家，按照格式，根据用户输入的文章，提取文章关键信息，生成生动且吸引人的文章标题。
  注意：四个标题字数范围都是十二到十六字! 
  例：食品检出核酸阳性具有传染性吗？专家这样说!
  输入:"""文章内容"""
  输出:xxx：xxx？/xxx？xxx！/xxx，xxx/xxx，xxx
  输入:"""${content}"""
  输出:`;
  return prompt;
};

// const wordReplacementPrompt = (content: string) => {
//   const prompt = `请按格式修改部分词语短句，润色输入的文章，不需要输出修改后的文章
//   输入: """文章内容"""
//   输出: [{"before": "aa", "after": "bb"}]
//   输入:"""${content}"""
//   输出:...`;
//   return prompt;
// };

const wordReplacementPrompt = (content: string) => {
  const prompt = `请你充当一名新闻稿件编辑专家，按照格式去修改用户输入新闻稿件的部分词句，使其更加流畅，优美。注意，不需要输出修改后的文章。
  例: [{"before": "说是", "after": "声称"},{"before": "我们奇怪他们", "after": "我们怀疑他们"},{"before": "不害怕", "after": "临危不乱"}]
  输入: """文章内容"""
  输出: [{"before": "aa", "after": "bb"},...]
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

const imgCreationPrompt = (content: string) => {
  const prompt = `Please translate the following articles into English, and generate a representative article label based on the translated article content
Example:environmental pollution, nature, economy
Note:no more than two words
Input:"""content"""
Output:tag name
Input:"""
${content}
"""
Output:`;
  return prompt;
};

const filterJSON = (data: string) => {
  // 找到最后一个 '}]' 出现的位置
  const lastIndex = data.lastIndexOf('}');

  if (lastIndex !== -1) {
    // 截取有效的 JSON 字符串部分
    const validData = `${data.substring(0, lastIndex + 1)}]`;

    // 解析有效的 JSON 数据
    const parsedData = JSON.parse(validData);

    // 创建一个空数组，用于存储符合条件的数据
    const filteredData = [];

    // 过滤不完整的数据
    for (let i = 0; i < parsedData.length; i++) {
      const item = parsedData[i];
      if (item.before && item.after) {
        filteredData.push(item);
      }
    }

    // 将过滤后的数据转换为 JSON 字符串
    const filteredJSON = JSON.stringify(filteredData);

    return filteredJSON;
  } else {
    return '';
  }
};
