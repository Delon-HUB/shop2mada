import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './modules/game/game.module';
import { OfferModule } from './modules/offer/offer.module';
import { ArticleModule } from './modules/article/article.module';
import { PaymentMethodModule } from './modules/paymentMethod/paymentMethod.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DB_URI ?? 'mongodb://localhost:27017/shop2mada',
    ),
    GameModule,
    OfferModule,
    ArticleModule,
    PaymentMethodModule,
    PaymentModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
