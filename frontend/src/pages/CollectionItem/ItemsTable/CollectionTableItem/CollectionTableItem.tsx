import { Tr, Td, IconButton } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import CollectionTableItemProps from './types';

function CollectionTableItem({ item }: CollectionTableItemProps) {
  const { userId } = useParams();
  const { id, name, collection_id } = item;

  const navigate = useNavigate();

  return (
    <Tr pos="relative">
      <Td textAlign="center">{id}</Td>
      <Td textAlign="center">{name}</Td>
      <Td textAlign="center">
        <IconButton
          onClick={() =>
            navigate(`/collections/${userId}/${collection_id}/${id}`)
          }
          aria-label="See item"
          icon={<ViewIcon />}
          title={`See the ${name}'s item`}
          colorScheme="green"
        />
      </Td>
      <Td textAlign="center">
        <IconButton
          aria-label="Edit item"
          icon={<EditIcon />}
          title={`Edit the ${name}'s item`}
          colorScheme="green"
        />
      </Td>
    </Tr>
  );
}

export default CollectionTableItem;
