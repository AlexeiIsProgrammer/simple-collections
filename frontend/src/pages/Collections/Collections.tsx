import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { ROLE } from '@models/enums';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import CollectionsList from './CollectionsList';
import CreateCollectionModal from './CreateCollectionModal';

function Collections() {
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector(authSelector);
  const { userId } = useParams();

  const disclosure = useDisclosure();

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
          : `${t('collections.collections')} ${user?.name}`}
        <Button ml={5} onClick={() => disclosure.onOpen()} colorScheme="green">
          {t('collections.create')}
        </Button>
      </Heading>
      <CollectionsList userId={Number(user?.id || 0)} />
    </Box>
  );
}

export default Collections;
