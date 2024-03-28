import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import MarkdownTextarea from '@components/MarkdownTextarea/MarkdownTextarea.component';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './EditInputField.module.scss';
import EditInputFieldProps from './types';

function EditInputField({
  readonly,
  saveHandler,
  type,
  initialValue,
}: EditInputFieldProps) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'edit' | 'read'>('read');
  const [value, setValue] = useState<string>(initialValue);
  const savedValue = useRef<string>(initialValue);

  const onChangeViewMode = () => {
    if (viewMode === 'edit') {
      if (value !== savedValue.current) saveHandler(value);
      setViewMode('read');
    } else {
      setViewMode('edit');
    }
    savedValue.current = value;
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
      {t('editInputField.Save')}
    </Button>
  );

  return (
    <Box
      className={clsx(styles.box, {
        [styles.read]: viewMode === 'read',
        [styles.input]: type !== 'textarea',
        [styles.readonly]: readonly,
      })}
    >
      {viewMode === 'edit' && !readonly ? (
        type === 'textarea' ? (
          <MarkdownTextarea isEdit onChange={onChangeValue} value={value} />
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
      {viewMode === 'edit' && !readonly && type !== 'input' && (
        <Button
          colorScheme="white"
          variant="outline"
          className={styles.edit}
          onClick={onChangeViewMode}
          aria-label="Edit field"
        >
          {t('editInputField.Save')}
        </Button>
      )}
    </Box>
  );
}

export default EditInputField;
