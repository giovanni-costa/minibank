import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { PrismaService } from 'src/PrismaService';

@Module({
  controllers: [TransfersController],
  providers: [TransfersService, PrismaService]
})
export class TransfersModule {}
