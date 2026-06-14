import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, JwtModule, MailModule],
  controllers: [AuthController],
  providers: [UserService, AuthService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
