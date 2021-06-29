import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.cofig';
import { UserModule } from './user/user.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
  TypeOrmModule.forRoot(typeOrmConfig),
  UserModule,
  LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
