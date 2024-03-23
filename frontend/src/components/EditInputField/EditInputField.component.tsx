import clsx from 'clsx';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import MarkdownTextarea from '@components/MarkdownTextarea/MarkdownTextarea.component';
import React, { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './EditInputField.module.scss';
import EditInputFieldProps from './types';

function EditInputField({
  saveHandler,
  type,
  initialValue,
}: EditInputFieldProps) {
  const [viewMode, setViewMode] = useState<'edit' | 'read'>('read');
  const [value, setValue] = useState<string>(initialValue);
  const savedValue = useRef<string>(initialValue);

  const onChangeViewMode = () => {
    if (viewMode === 'edit') {
      if (value !== savedValue.current) saveHandler(value);
      setViewMode('read');
    } else {
      savedValue.current = value;
      setViewMode('edit');
    }
  };

  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const saveButton = () => (
    <Button
      variant="outline"
      className={styles.edit}
      onClick={onChangeViewMode}
      aria-label="Edit field"
    >
      Save
    </Button>
  );

  return (
    <Box
      className={clsx(styles.box, {
        [styles.read]: viewMode === 'read',
        [styles.input]: type !== 'textarea',
      })}
    >
      {viewMode === 'edit' ? (
        type === 'textarea' ? (
          <MarkdownTextarea
            isEdit
            defaultValue={savedValue.current}
            onChange={onChangeValue}
            value={value}
          />
        ) : (
          <InputGroup size="md">
            <Input
              onChange={onChangeValue}
              value={value}
              w={`calc(${value.length || 1}ch + 10ch)`}
            />
            <InputRightElement width="5rem">{saveButton()}</InputRightElement>
          </InputGroup>
        )
      ) : (
        <Box onClick={() => setViewMode('edit')}>
          {type === 'textarea' ? (
            <Markdown remarkPlugins={[remarkGfm]}>{value}</Markdown>
          ) : (
            <Text py="2">{value}</Text>
          )}
        </Box>
      )}
      {viewMode === 'edit' && type !== 'input' && (
        <Button
          variant="outline"
          className={styles.edit}
          onClick={onChangeViewMode}
          aria-label="Edit field"
        >
          Save
        </Button>
      )}
    </Box>
  );
}

export default EditInputField;
