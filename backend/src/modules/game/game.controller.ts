import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IGame } from '../../shared/Types/Interfaces';
import { GameService } from './game.service';
import { Public } from '../../shared/Types/decorators/decorators';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() createGameDto: IGame) {
    return await this.gameService.create(createGameDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.gameService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.gameService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<IGame>) {
    return await this.gameService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.gameService.softDelete(id);
  }
}
