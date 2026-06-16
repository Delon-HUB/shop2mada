import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './modules/game/game.module';
import { OfferModule } from './modules/offer/offer.module';
import { ArticleModule } from './modules/article/article.module';
import { PaymentMethodModule } from './modules/paymentMethod/paymentMethod.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    GameModule,
    OfferModule,
    ArticleModule,
    PaymentMethodModule,
    PaymentModule,
    OrderModule,
  ],
})
export class AppModule {}
