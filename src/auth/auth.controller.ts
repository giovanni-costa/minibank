import { Controller, Get, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // This is the LOGIN method -- if does not need a GUARD
  @Get()
  login(@Query('cpf') cpf: string, @Query('pwd') pwd: string) {
    return this.authService.login(cpf, pwd);
  }
}
