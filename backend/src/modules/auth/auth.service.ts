import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { EError, ERole } from '../../shared/Types/Enums';
import { IJwtPayload, ILogin, IUser } from '../../shared/Types/Interfaces';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(createUserDto: Partial<IUser>, admin = false): Promise<IUser> {
    if (
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.firstName
    )
      throw new HttpException(EError.INCOMPLETE_DATA, 400);

    const tmpUser: IUser = {
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      role: admin ? ERole.ADMIN : ERole.CLIENT,
      verified: false,
    };

    const existingUser = await this.userService.findByEmail(tmpUser.email);
    if (existingUser) throw new HttpException(EError.EMAIL_ALREADY_EXISTS, 400);

    const salt = genSaltSync(10);
    const cryptedPassword = hashSync(tmpUser.password, salt);
    tmpUser.password = cryptedPassword;
    tmpUser.otp = this.generateOtp();
    tmpUser.otpExpiry = new Date(Date.now() + 30 * 60 * 1000);
    const user: IUser = await this.userService.create(tmpUser);

    await this.mailService.sendOtp(user.email, user.otp!);
    console.log('register');
    return user;
  }

  async login(
    loginDto: ILogin,
  ): Promise<{ accessToken: string; verified: boolean }> {
    const user: IUser | null = await this.userService.findByEmail(
      loginDto.email,
    );
    if (!user) throw new HttpException(EError.USER_NOT_FOUND, 404);
    const isPasswordValid = compareSync(loginDto.password, user.password);
    if (!isPasswordValid) throw new HttpException(EError.WRONG_PASSWORD, 401);
    const payload: IJwtPayload = {
      sub: user._id!,
      role: user.role,
    };
    return {
      accessToken: await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET + '' || 'fdsafkjfkjdsafljwlkjfl',
        expiresIn: '1d',
      }),
      verified: user.verified,
    };
  }

  async sendOtp(
    email: string,
  ): Promise<{ verified: boolean; message: string }> {
    const user: IUser | null = await this.userService.findByEmail(email);
    if (!user) throw new HttpException(EError.USER_NOT_FOUND, 404);
    const otp = this.generateOtp();
    await this.userService.update(user._id!, {
      otp,
      otpExpiry: new Date(Date.now() + 30 * 60 * 1000),
      verified: false,
    });
    await this.mailService.sendOtp(user.email, otp);
    return {
      verified: false,
      message: `OTP sent to ${email}. It is valid for 30 minutes.`,
    };
  }

  async verifyOtp(email: string, otp: string) {
    const user: IUser | null = await this.userService.findByEmail(email);
    if (!user) throw new HttpException(EError.USER_NOT_FOUND, 404);
    if (user.otp !== otp) throw new HttpException(EError.INVALID_OTP, 400);
    if (user.otpExpiry && user.otpExpiry < new Date())
      throw new HttpException(EError.OTP_EXPIRED, 400);

    user.otp = null;
    user.otpExpiry = null;
    user.verified = true;
    await this.userService.update(user._id!, user);
    return { verified: true };
  }

  private generateOtp(): string {
    return Math.floor(1_000 + Math.random() * 9_000).toString();
  }
}
