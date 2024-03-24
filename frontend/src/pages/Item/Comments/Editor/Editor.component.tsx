import { Button, Flex, useToast } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { authSelector } from '@redux/slices/userSlice';
import { useAddCommentMutation } from '@services/collection-item';
import { useAppSelector } from '@redux/index';
import { useState } from 'react';
import { config } from './config';
import EditorProps from './types';

function Editor({ itemId, onToggle }: EditorProps) {
  const toast = useToast();
  const [editorValue, setEditorValue] = useState(
    '<p>This is a good item, really!</p>'
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
        title: 'Comment successfully added!',
        status: 'success',
        position: 'top',
      });
    } catch {
      toast({
        title: 'Adding comment went wrong..',
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
        Add comment
      </Button>
    </Flex>
  );
}

export default Editor;
