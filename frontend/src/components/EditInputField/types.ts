type EditInputFieldProps = {
  saveHandler: (value: string) => void;
  type: 'textarea' | 'input';
  initialValue: string;
  readonly?: boolean;
};

export default EditInputFieldProps;
