import { Button, Flex } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { authSelector } from '@redux/slices/userSlice';
import { useAddCommentMutation } from '@services/collection-item';
import { useAppSelector } from '@redux/index';
import { useState } from 'react';
import { config } from './config';
import EditorProps from './types';

function Editor({ itemId }: EditorProps) {
  const [editorValue, setEditorValue] = useState(
    '<p>This is a good item, really!</p>'
  );
  const { user } = useAppSelector(authSelector);
  const [saveComment, { isLoading }] = useAddCommentMutation();

  const onSaveHandle = () => {
    if (!editorValue || !user) return;

    saveComment({
      name: user.name,
      text: editorValue,
      itemId,
    });
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
