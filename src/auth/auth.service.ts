import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/PrismaService';
import * as bcrypt from 'bcrypt'
import { JwtService} from '@nestjs/jwt'
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';


@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService){}

  async login(cpf: string, pwd: string){

    const data = {
      cpf: cpf,
      password: pwd
    }

    const userData = await this.validateCredentials(data)

    if(!userData) { 
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST)
    }

    const payload = {
      sub: userData.name,
      id: userData.id,
      amount: userData.amount,
      role: userData.role
    }

    const hashToken = this.jwtService.sign(payload)

    return {
      token: hashToken,
      data: this.jwtService.decode(hashToken)
    }

  }

  async validateCredentials(data: CreateAuthDto){

    const userData = await this.prisma.miniBanco.findFirstOrThrow({
      where: { cpf: data.cpf }
    })

    if(userData.cpf === data.cpf && bcrypt.compareSync(data.password, userData.password)){
      return userData;
    }    
  }
}
