import { Body, Controller, Get, Post } from '@nestjs/common';
import type { IGame } from '../../shared/Types/Interfaces';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get()
  getHello(): string {
    return 'Hello World from game controller!';
  }

  @Post()
  async createGame(@Body() createGameDto: IGame) {
    console.log(createGameDto);
    const newGame = await this.gameService.create(createGameDto);
    console.log(newGame);
    return newGame;
  }
}
