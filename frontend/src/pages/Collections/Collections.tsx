import { createPortal } from 'react-dom';
import { ROLE } from '@models/enums';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import CollectionsList from './CollectionsList';
import CreateCollectionModal from './CreateCollectionModal';

function Collections() {
  const { user } = useAppSelector(authSelector);
  const { userId } = useParams();

  const disclosure = useDisclosure();

  if (user && user.id !== userId && user.role !== ROLE.ADMIN) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      {createPortal(
        <CreateCollectionModal disclosure={disclosure} />,
        document.body
      )}
      <Heading my={5} textAlign="center" as="h1">
        {user?.name} collections
        <Button ml={5} onClick={() => disclosure.onOpen()} colorScheme="green">
          Create a new one?
        </Button>
      </Heading>
      <CollectionsList userId={user?.id || ''} />
    </Box>
  );
}

export default Collections;
