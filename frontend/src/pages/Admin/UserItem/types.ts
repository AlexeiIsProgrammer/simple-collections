import { User } from '@models/interfaces';
import { ActionType } from '@services/user';

type UserItemProps = {
  user: User;
  currentUser: User | null;
  checkCheckbox: (e: React.ChangeEvent<HTMLInputElement>, id: User) => void;
  isChecked: boolean;
  deleteUserHandle: (ids: string[]) => void;
  changeUserHandle: (actions: ActionType[]) => void;
};

export default UserItemProps;
