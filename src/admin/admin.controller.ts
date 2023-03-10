import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, FindCustomer } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/auth/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt-guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { AuthGuard } from 'src/auth-guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createCustomer(createAdminDto);
  }

  @Roles(['admin'])
  @Get()
  @UseGuards(JwtGuard, RoleGuard)
  findAll(@Query() query: FindCustomer) {
    return this.adminService.findAllCustomers(query);
  }

  @Roles(['admin', 'user'])
  @Get(':id')
  @UseGuards(JwtGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.adminService.findOneCustomer(id);
  }

  @Roles(['admin'])
  @Patch(':id')
  @UseGuards(JwtGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateCustomer(id, updateAdminDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.adminService.removeCustomer(id);
  }
}
