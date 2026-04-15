import { Body, Controller, Get, Post } from '@nestjs/common';
import type { IGame } from '../../shared/Types/Interfaces';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get()
  async getHello() {
    return await this.gameService.findAll();
  }

  @Post()
  async createGame(@Body() createGameDto: IGame) {
    const newGame = await this.gameService.create(createGameDto);
    return newGame;
  }
}
