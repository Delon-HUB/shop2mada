import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AppModule } from '../../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { PaymentMethodModule } from '../paymentMethod/paymentMethod.module';
import { PaymentMethodService } from '../paymentMethod/paymentMethod.service';

@Module({
  imports: [
    AppModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    AuthModule,
    UserModule,
    JwtModule,
    MailModule,
    PaymentMethodModule,
  ],
  providers: [SeedService, AuthService, PaymentMethodService],
})
export class SeedModule {}
