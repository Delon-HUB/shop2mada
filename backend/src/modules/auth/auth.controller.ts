import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { IUser, ILogin } from '../../shared/Types/Interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: IUser) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: ILogin) {
    return await this.authService.login(loginDto);
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return await this.authService.sendOtp(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return await this.authService.verifyOtp(email, otp);
  }
}
