import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

export const config = {
  plugins: [Essentials, Paragraph, Heading, Bold, Italic, Underline],
  toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline'],
};
