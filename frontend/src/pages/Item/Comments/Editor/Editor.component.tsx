import { Button, Flex, useToast } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import { useAddCommentMutation } from '@services/collection-item';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { config } from './config';
import EditorProps from './types';

function Editor({ itemId, onToggle }: EditorProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const [editorValue, setEditorValue] = useState(
    `<p>${t('editor.default')}</p>`
  );
  const { user } = useAppSelector(authSelector);
  const [saveComment, { isLoading }] = useAddCommentMutation();

  const onSaveHandle = async () => {
    if (!editorValue || !user) return;

    try {
      await saveComment({
        role: user.role || 'anonymous',
        name: user.name,
        text: editorValue,
        itemId,
      });

      onToggle();

      toast({
        title: t('editor.added'),
        status: 'success',
        position: 'top',
      });
    } catch {
      toast({
        title: t('editor.addedFailed'),
        status: 'error',
        position: 'top',
      });
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <CKEditor
        editor={ClassicEditor}
        data={editorValue}
        onChange={(e, editor) => {
          setEditorValue(editor.data.get());
        }}
        config={config}
      />
      <Button isLoading={isLoading} onClick={onSaveHandle} mr="auto">
        {t('editor.add')}
      </Button>
    </Flex>
  );
}

export default Editor;
