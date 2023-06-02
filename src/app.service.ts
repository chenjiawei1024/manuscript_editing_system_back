import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { askAICreateImg } from './utils/openAI';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async fetchPhotos(content: string): Promise<any> {
    const img_tag = await askAICreateImg(content);
    console.log(img_tag);
    try {
      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_TOKEN}`,
          },
          params: {
            query: img_tag,
          },
        },
      );
      return response.data;
    } catch (error) {
      return 'oops, something went wrong!';
    }
  }
}
