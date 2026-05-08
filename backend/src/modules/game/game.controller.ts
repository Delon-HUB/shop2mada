import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import type { IGame } from '../../shared/Types/Interfaces';
import { GameService } from './game.service';
import { OfferService } from '../offer/offer.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly offerService: OfferService,
  ) {}

  @Post()
  async createGame(@Body() createGameDto: IGame) {
    const newGame = await this.gameService.create(createGameDto);
    return newGame;
  }

  @Get()
  async findAll() {
    const games = await this.gameService.findAll();
    const gamesWithOffers = await Promise.all(
      games.map(async (game) => {
        const offers = await this.offerService.findByGameId(game.id);
        return { ...game, offers };
      }),
    );
    console.log(gamesWithOffers);
    return gamesWithOffers;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const game = await this.gameService.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
}
