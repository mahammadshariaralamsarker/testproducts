import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createAuthDto: CreateAuthDto): Promise<AuthEntity> {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = this.authRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });
    return this.authRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(loginDto: LoginAuthDto) {

    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, id: user.id };
    return {
      data:user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
