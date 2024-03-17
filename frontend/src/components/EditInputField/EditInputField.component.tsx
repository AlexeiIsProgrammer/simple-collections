import clsx from 'clsx';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Input, Text } from '@chakra-ui/react';
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
      if (value !== savedValue.current) saveHandler();
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

  return (
    <Box
      className={clsx(styles.box, {
        [styles.read]: viewMode === 'read',
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
          <Input onChange={onChangeValue} value={value} />
        )
      ) : type === 'textarea' ? (
        <Markdown remarkPlugins={[remarkGfm]}>{value}</Markdown>
      ) : (
        <Text py="2">{value}</Text>
      )}
      <IconButton
        className={styles.edit}
        onClick={onChangeViewMode}
        aria-label="Edit field"
        icon={viewMode === 'edit' ? <CheckIcon /> : <EditIcon />}
        variant="ghost"
      />
    </Box>
  );
}

export default EditInputField;
