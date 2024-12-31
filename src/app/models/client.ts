import {Region} from './region';

export class Client {
  id!: number;
  name: string = '';
  lastName: string = '';
  createAt: string = '';
  email: string = '';
  foto: string = '';
  region: Region;
}
