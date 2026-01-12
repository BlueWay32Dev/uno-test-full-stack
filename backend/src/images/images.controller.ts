import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('deck')
  async getDeck(@Query('pairs', new ParseIntPipe({ optional: true })) pairs?: number) {
    const pairCount = pairs || 8;
    return this.imagesService.generateDeck(pairCount);
  }

  @Get('external')
  async getExternalImages() {
    return this.imagesService.fetchExternalImages();
  }
}
