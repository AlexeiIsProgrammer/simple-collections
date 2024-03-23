type EditInputFieldProps = {
  saveHandler: (value: string) => void;
  type: 'textarea' | 'input';
  initialValue: string;
};

export default EditInputFieldProps;
