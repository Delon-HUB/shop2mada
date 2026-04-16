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

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() createGameDto: IGame) {
    const newGame = await this.gameService.create(createGameDto);
    return newGame;
  }

  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const game = await this.gameService.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }
}
