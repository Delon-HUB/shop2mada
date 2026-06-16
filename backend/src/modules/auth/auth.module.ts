import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwtStrategy';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [UserModule, JwtModule, MailModule],
  controllers: [AuthController],
  providers: [UserService, AuthService, MailService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
