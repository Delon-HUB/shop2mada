import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IGame } from '../../shared/Types/Interfaces';
import { GameService } from './game.service';
import { OfferService } from '../offer/offer.service';
import { ArticleService } from '../article/article.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly offerService: OfferService,
    private readonly articleService: ArticleService,
  ) {}

  @Post()
  async createGame(@Body() createGameDto: IGame) {
    const newGame = await this.gameService.create(createGameDto);
    return newGame;
  }

  @Get()
  async findAll() {
    const games = await this.gameService.findAll();
    const gameReturned = await Promise.all(
      games.map(async (game) => {
        const offers = await this.offerService.findByGameId(game._id);
        const offersReturned = await Promise.all(
          offers.map(async (offer) => {
            const articles = await this.articleService.findByOfferId(offer._id);
            return { ...offer, articles };
          }),
        );
        return { ...game, offers: offersReturned };
      }),
    );
    return gameReturned;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const game = await this.gameService.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IGame>) {
    const updatedArticle = await this.gameService.findById(id);
    if (!updatedArticle) throw new NotFoundException('Game not found');
    return await this.gameService.update(id, updateData);
  }
}
