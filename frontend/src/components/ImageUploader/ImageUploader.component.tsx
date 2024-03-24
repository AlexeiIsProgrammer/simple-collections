import clsx from 'clsx';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { ChangeEvent, HTMLAttributes, forwardRef, useState } from 'react';
import styles from './ImageUploader.module.scss';
import { useTranslation } from 'react-i18next';

const ImageUploader = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement> & {
    preview: string;
    setPreview: React.Dispatch<React.SetStateAction<string>>;
  }
>(({ preview, setPreview, ...props }, ref) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [highlight, setHighlight] = useState(false);
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
      toast({
        title: 'Image uploading went wrong...',
        status: 'error',
        position: 'top',
      });
    };
  }

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    setDrop(true);

    let files;

    if (e.target instanceof HTMLInputElement) {
      files = e.target.files;
      setPreview('');
    } else if (e.dataTransfer) {
      files = e.dataTransfer.files;
    }

    if (files) uploadFile(files[0]);
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
