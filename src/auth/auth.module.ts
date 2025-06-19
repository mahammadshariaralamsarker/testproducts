import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity'; 
import { JwtStrategy } from 'src/utils/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
