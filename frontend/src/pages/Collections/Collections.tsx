import * as jsonexport from 'jsonexport/dist';

import { DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { ROLE } from '@models/enums';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import {
  ExportCollection,
  useLazyGetExportCollectionsQuery,
} from '@services/collection';
import { useGetUserQuery } from '@services/user';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import CollectionsList from './CollectionsList';
import CreateCollectionModal from './CreateCollectionModal';

function Collections() {
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector(authSelector);
  const { userId } = useParams();

  const { data: paramsUser } = useGetUserQuery(userId || '', { skip: !userId });

  const [exportCollections, { isLoading }] = useLazyGetExportCollectionsQuery();

  const disclosure = useDisclosure();
  const exportHandle = async () => {
    try {
      const data: ExportCollection[] = await exportCollections(
        Number(userId || 0)
      ).unwrap();

      jsonexport(data, { rowDelimiter: ';' }, (err: Error, csv: string) => {
        if (err) throw new Error(err.message);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch {
      throw new Error('Failed to download .csv');
    }
  };

  if (!user) {
    return <CustomSpinner />;
  }

  if (user && user.id !== Number(userId || 0) && user.role !== ROLE.ADMIN) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      {createPortal(
        <CreateCollectionModal disclosure={disclosure} />,
        document.body
      )}
      <Heading my={5} textAlign="center" as="h1">
        {i18n.language === 'en'
          ? `${user?.name} ${t('collections.collections')}`
          : `${t('collections.collections')} ${paramsUser?.name}`}

        <ButtonGroup size="sm" variant="solid" colorScheme="green">
          <Button ml={5} onClick={() => disclosure.onOpen()}>
            {t('collections.create')}
          </Button>

          <IconButton
            isLoading={isLoading}
            onClick={exportHandle}
            aria-label={t('collections.export')}
            title={t('collections.export')}
            icon={<DownloadIcon />}
          />
        </ButtonGroup>
      </Heading>
      <CollectionsList userId={Number(userId || 0)} />
    </Box>
  );
}

export default Collections;
