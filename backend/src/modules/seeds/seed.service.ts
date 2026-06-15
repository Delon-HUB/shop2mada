import { Injectable, Logger } from '@nestjs/common';
import { ERole } from '../../shared/Types/Enums';
import { AuthService } from '../auth/auth.service';
import {
  IArticle,
  IGame,
  IOffer,
  IPaymentMethod,
} from '../../shared/Types/Interfaces';
import { PaymentMethodService } from '../paymentMethod/paymentMethod.service';
import { GameService } from '../game/game.service';
import { OfferService } from '../offer/offer.service';
import { ArticleService } from '../article/article.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly gameService: GameService,
    private readonly offerService: OfferService,
    private readonly articleService: ArticleService,
  ) {}

  async run() {
    const admin = await this.createAdmin();
    const games = await this.createGame();
    const paymentMethods = await this.createMobileMoney();

    const logger = new Logger();

    logger.log(`
      \n-------------------------------------------------|\n
      \t- Your OTP code is 🔑🔑🔑 ${admin.otp} 🔑🔑🔑 \n
      \t- 🎮🎮🎮  GAME CREATED  🎮🎮🎮\n
      \t- 💰💰💰  MOBILE MONEY CREATED  💰💰💰\n
      -------------------------------------------------\n
      `);
  }

  async createAdmin() {
    const admin = {
      firstName: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: ERole.ADMIN,
    };

    const createdAdmin = await this.authService.register(admin, true);
    return createdAdmin;
  }

  async createMobileMoney() {
    const paymentMethodList: IPaymentMethod[] = require('./data/paymentMethod.json');
    const createdList = await Promise.all(
      paymentMethodList.map(
        async (pm) => await this.paymentMethodService.create(pm),
      ),
    );

    return createdList;
  }

  async createGame() {
    const gameList: IGame[] = require('./data/games.json');

    const createdList = await Promise.all(
      gameList.map(async (g) => {
        const gameCreated = await this.gameService.create(g);
        gameCreated.offers = await Promise.all(
          (g.offers as IOffer[]).map(async (o) => {
            o.gameId = gameCreated._id;
            const offerCreated = await this.offerService.create(o);

            offerCreated.articles = await Promise.all(
              (o.articles as IArticle[]).map(async (a) => {
                a.offerId = offerCreated._id;
                const articleCreated = await this.articleService.create(a);
                return articleCreated;
              }),
            );
            return offerCreated;
          }),
        );
        return gameCreated;
      }),
    );

    return createdList;
  }
}
