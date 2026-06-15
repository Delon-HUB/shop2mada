import { Injectable, Logger } from '@nestjs/common';
import { ERole } from '../../shared/Types/Enums';
import { AuthService } from '../auth/auth.service';
import { IPaymentMethod } from '../../shared/Types/Interfaces';
import { PaymentMethodService } from '../paymentMethod/paymentMethod.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async run() {
    console.log('seed test...');
  }

  async createAdmin() {
    const admin = {
      firstName: 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: ERole.ADMIN,
    };

    const createdAdmin = await this.authService.register(admin, true);
    const logger = new Logger();
    logger.log(`Your OTP code is ${createdAdmin.otp}`);
  }

  async createMobileMoney() {
    const paymentMethodList: IPaymentMethod[] = require('./data/paymentMethod.json');
    const logger = new Logger();
    const createdList = await Promise.all(
      paymentMethodList.map(
        async (pm) => await this.paymentMethodService.create(pm),
      ),
    );

    logger.log(createdList);
  }
}
