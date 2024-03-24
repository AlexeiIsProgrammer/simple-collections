import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useGetCollectionItemsByTagNameQuery } from '@services/collection-item';
import { useGetTagQuery } from '@services/tag';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useParams } from 'react-router-dom';

function Results() {
  const { t } = useTranslation();
  const { tagId } = useParams();

  const { data: tag } = useGetTagQuery(tagId || '', { skip: !tagId });

  const {
    data: items,
    isLoading,
    isError,
  } = useGetCollectionItemsByTagNameQuery(tagId || '', { skip: !tagId });

  if (isError || (!items && !isLoading)) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('results.error')}
      </Alert>
    );
  }

  if (items?.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        {t('results.empty')}
        <Button ml={2} as={NavLink} to="/">
          {t('results.back')}
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      <Flex gap={5} alignItems="center" justifyContent="center">
        <Text as="h1" fontSize={50} textAlign="center">
          {t('results.results')}
        </Text>
        <Tag size="lg" colorScheme="green">
          {tag?.name}
        </Tag>
      </Flex>
      <HStack mt={10} flexWrap="wrap">
        {items?.map(({ id, name, collection_id, user_id, collection_name }) => (
          <Stat
            key={id}
            cursor="pointer"
            as={Link}
            p={2}
            border="1px solid transparent"
            borderRadius={5}
            _hover={{
              borderColor: 'inherit',
            }}
            to={`/collections/${user_id}/${collection_id}/${id}`}
          >
            <StatLabel fontSize={26}>{name}</StatLabel>
            <StatHelpText fontSize={16}>
              {t('results.collection')}: {collection_name}
            </StatHelpText>
          </Stat>
        ))}
      </HStack>
    </Box>
  );
}

export default Results;
