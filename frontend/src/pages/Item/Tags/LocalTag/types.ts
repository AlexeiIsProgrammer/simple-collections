import { FocusEvent } from 'react';
import { ActionTypeWithPrev } from '../Tags.component';

type LocalTagProps = {
  localTag: ActionTypeWithPrev;
  isEditTags: boolean;
  onBlur: (e: FocusEvent<HTMLInputElement>, tag: ActionTypeWithPrev) => void;
  closeTagHandler: (tag: ActionTypeWithPrev) => void;
};

export default LocalTagProps;
