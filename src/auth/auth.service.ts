import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/PrismaService';
import * as bcrypt from 'bcrypt'
import { JwtService} from '@nestjs/jwt'


@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService){}

  async login(cpf: string, pwd: string){

    const data = {
      cpf: cpf,
      password: pwd
    }

    const userData = await this.validateCredentials(data)

    if(!userData) { throw new Error('Invalid Credentials')}

    const payload = {
      sub: userData.name,
      role: userData.role
    }

    return { 
      token: this.jwtService.sign(payload),
      data: userData
    };
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
