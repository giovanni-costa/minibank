import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/PrismaService';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService]
})
export class AdminModule {}
