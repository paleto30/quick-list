export interface Student {
  id: string;
  groupId: string;
  dni: string;
  name: string;
  lastName: string;
  birthday: Date;
  email: string;
  phone: string;
  image: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
