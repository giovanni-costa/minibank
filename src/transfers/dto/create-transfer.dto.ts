export class CreateTransferDto {
    id?: string
    sender: string
    receiver: string
    value: number
    date?: Date
}
