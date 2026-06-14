import { Injectable } from '@nestjs/common';
import { ERole } from '../../shared/Types/Enums';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SeedService {
  constructor(private readonly authService: AuthService) {}

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
    console.log(createdAdmin);
  }

  async createMobileMoney() {
    console.log('mobile money created');
  }
}
