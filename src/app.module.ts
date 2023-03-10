import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './PrismaService';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { TransfersModule } from './transfers/transfers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, UsersModule, TransfersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
