export class CreateAdminDto {
  id?: string;
  cpf: string;
  password: string;
  name: string;
  amount?: number;
  role: string;
}

export class FindCustomer {
  id?: string;
  cpf?: string;
}
