import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { JwtGuard } from 'src/auth/jwt-guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Roles(["admin","user"]) // All Roles can Transfer
  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  create(@Body() data: CreateTransferDto) {
    return this.transfersService.create(data);
  }

  @Roles(["admin"])
  @Get()
  @UseGuards(JwtGuard, RoleGuard)
  findAll() {
    return this.transfersService.findAll();
  }

  @Roles(["admin","user"]) // All Roles can check for a single Transfer
  @Get(':id')
  @UseGuards(JwtGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.transfersService.findOne(id);
  }

/*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferDto) {
    return this.transfersService.update(+id, updateTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transfersService.remove(+id);
  } */
}
