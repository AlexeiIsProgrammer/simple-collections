import { TextareaHTMLAttributes } from 'react';

type MarkdownTextareaProps = {
  isEdit?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default MarkdownTextareaProps;
