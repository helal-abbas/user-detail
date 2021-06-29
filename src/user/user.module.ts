import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserController } from './user.controller';
import { User } from './Entity/user.entity';
import { UserService } from './user.service';
import { SmsServiceTrigger } from 'src/service/sms-service.trigger';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({
    secret:'topSecret51',
    signOptions:{
      expiresIn:3600,
    },
  }),
  TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy,SmsServiceTrigger],
  exports :[UserModule,PassportModule,JwtStrategy]
})
export class UserModule {}
