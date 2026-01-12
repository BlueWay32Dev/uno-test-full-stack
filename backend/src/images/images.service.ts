import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Card, ExternalImage } from './interfaces/card.interface';

@Injectable()
export class ImagesService {
  private readonly imagesApiUrl: string;

  constructor(private configService: ConfigService) {
    this.imagesApiUrl =
      this.configService.get<string>('IMAGES_API_URL') ||
      'https://challenge-uno.vercel.app/api/images';
  }

  async fetchExternalImages(): Promise<ExternalImage[]> {
    try {
      const response = await axios.get(this.imagesApiUrl);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch images from external API',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async generateDeck(pairCount: number = 8): Promise<Card[]> {
    const externalImages = await this.fetchExternalImages();

    if (externalImages.length < pairCount) {
      throw new HttpException(
        `Not enough images available. Required: ${pairCount}, Available: ${externalImages.length}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const selectedImages = externalImages.slice(0, pairCount);

    const cards: Card[] = [];
    selectedImages.forEach((image, index) => {
      cards.push(
        {
          id: `${index}-1`,
          imageUrl: image.url,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `${index}-2`,
          imageUrl: image.url,
          isFlipped: false,
          isMatched: false,
        },
      );
    });

    return this.shuffleDeck(cards);
  }

  private shuffleDeck(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
