import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { ImagesService } from './images.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ImagesService', () => {
  let service: ImagesService;
  let configService: ConfigService;

  const mockExternalImages = [
    { id: '1', url: 'https://example.com/image1.jpg' },
    { id: '2', url: 'https://example.com/image2.jpg' },
    { id: '3', url: 'https://example.com/image3.jpg' },
    { id: '4', url: 'https://example.com/image4.jpg' },
    { id: '5', url: 'https://example.com/image5.jpg' },
    { id: '6', url: 'https://example.com/image6.jpg' },
    { id: '7', url: 'https://example.com/image7.jpg' },
    { id: '8', url: 'https://example.com/image8.jpg' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://challenge-uno.vercel.app/api/images'),
          },
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchExternalImages', () => {
    it('should fetch images from external API', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockExternalImages });

      const result = await service.fetchExternalImages();

      expect(result).toEqual(mockExternalImages);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://challenge-uno.vercel.app/api/images');
    });

    it('should throw HttpException when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(service.fetchExternalImages()).rejects.toThrow(HttpException);
    });
  });

  describe('generateDeck', () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue({ data: mockExternalImages });
    });

    it('should generate a deck with default 8 pairs (16 cards)', async () => {
      const deck = await service.generateDeck();

      expect(deck).toHaveLength(16);
    });

    it('should generate a deck with specified number of pairs', async () => {
      const deck = await service.generateDeck(4);

      expect(deck).toHaveLength(8);
    });

    it('should create pairs of cards with matching imageUrl', async () => {
      const deck = await service.generateDeck(4);

      const imageGroups = deck.reduce((acc, card) => {
        acc[card.imageUrl] = (acc[card.imageUrl] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.values(imageGroups).forEach((count) => {
        expect(count).toBe(2);
      });
    });

    it('should initialize all cards as not flipped and not matched', async () => {
      const deck = await service.generateDeck(4);

      deck.forEach((card) => {
        expect(card.isFlipped).toBe(false);
        expect(card.isMatched).toBe(false);
      });
    });

    it('should shuffle the deck', async () => {
      const deck1 = await service.generateDeck(8);
      const deck2 = await service.generateDeck(8);

      const order1 = deck1.map((c) => c.id).join(',');
      const order2 = deck2.map((c) => c.id).join(',');

      expect(order1).not.toBe(order2);
    });

    it('should throw error when not enough images available', async () => {
      await expect(service.generateDeck(10)).rejects.toThrow(HttpException);
    });
  });
});
