import { ROLE, STATUS } from '@models/enums';

export type User = {
  id: number;
  name: string;
  email: string;
  status: STATUS;
  role: ROLE;
};
