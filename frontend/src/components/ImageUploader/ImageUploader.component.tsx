import clsx from 'clsx';
import { Dropbox } from 'dropbox';
import { Box, Button, Text } from '@chakra-ui/react';
import { HTMLAttributes, forwardRef, useState } from 'react';
import styles from './ImageUploader.module.scss';

const dbx = new Dropbox({
  accessToken: import.meta.env.VITE_DROPBOX_ACCESS_TOKEN,
});

export const uploadFileToDropbox = async (
  file: File
): Promise<string | undefined> => {
  try {
    const response = await dbx.filesUpload({
      path: `/${Date.now()}`,
      contents: file,
    });
    const { path_lower } = response.result;

    const shareResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: path_lower || '',
    });
    const { url } = shareResponse.result;

    return url;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return undefined;
};

const ImageUploader = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState('');
  const [drop, setDrop] = useState(false);

  const handleEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (preview === '') {
      setHighlight(true);
    }
  };

  const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (preview === '') {
      setHighlight(true);
    }
  };

  const handleLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  function uploadFile(file: File) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileRes = btoa(reader?.result as string);
      setPreview(`data:image/jpg;base64,${fileRes}`);
    };

    reader.onerror = () => {
      alert('There is a problem while uploading...');
    };
  }

  const handleUpload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    setDrop(true);

    const [file]: File[] = e.target.files || e.dataTransfer.files;
    ref.current.files = e.target.files || e.dataTransfer.files;
    uploadFile(file);
  };

  return (
    <div
      onDragEnter={(e) => handleEnter(e)}
      onDragLeave={(e) => handleLeave(e)}
      onDragOver={(e) => handleOver(e)}
      onDrop={(e) => handleUpload(e)}
      style={{ backgroundImage: `url(${preview})` }}
      className={clsx(styles.upload, {
        [styles['is-highlight']]: highlight,
        [styles['is-drop']]: drop,
      })}
    >
      <Text>Drop image here</Text>
      <Box className={styles['upload-button']}>
        <input
          ref={ref}
          {...props}
          required
          type="file"
          className={styles['upload-file']}
          accept="image/*"
          onChange={(e) => handleUpload(e)}
        />
        <Button type="button">Upload Here</Button>
      </Box>
    </div>
  );
});

export default ImageUploader;
