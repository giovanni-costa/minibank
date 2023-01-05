export class CreateTransferDto {
  id?: string;
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  value: number;
  date?: Date;
}
