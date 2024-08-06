import { Role } from 'src/decorator/enums/role.enum';

export interface JwtPayload {
  email: string;
  username: string;
  id: number;
  role: Role;
}
