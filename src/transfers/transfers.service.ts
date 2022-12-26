import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { PrismaService } from 'src/PrismaService';

@Injectable()
export class TransfersService {

  constructor(private prisma:PrismaService){}

  async create(data: CreateTransferDto) {

    // Throws Error if an ID is given
    if(data.id) { throw new Error('IDs are autogenerated') }
    // Throws Error if a Date is given
    if(data.date) { throw new Error('Dates are autogenerated') }

    // Find Receiver and Sender
    const senderData = await this.prisma.miniBanco.findFirst({
      where:{id:data.sender}
    })

    const receiverData = await this.prisma.miniBanco.findFirst({
      where:{id:data.receiver}
    })

    // Throw Error if Funds are not enough
    if(senderData.amount.toNumber() < data.value || data.value <= 0) {throw new Error('Not enough funds!')}

    // Update funds for peers
    await this.prisma.miniBanco.update({
      data: {amount: senderData.amount.toNumber() - parseFloat(data.value.toString())},
      where:{
        id : senderData.id
      }
    })

    await this.prisma.miniBanco.update({
      data: {amount: receiverData.amount.toNumber() + parseFloat(data.value.toString())},
      where:{
        id : receiverData.id
      }
    })

    const create = await this
      .prisma
      .transfers
      .create({
        data,
      })

    return create;
  }

  async findAll() {
    return await this.prisma.transfers.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.miniBanco.findUniqueOrThrow({
      where:{
        id : id
      }
    })
  }

/*   update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  } */
}
