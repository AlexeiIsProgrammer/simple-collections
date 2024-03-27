import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import SearchInput from '@components/SearchInput';
import useDebounce from '@hooks/useDebounce';
import { ChangeEvent, useRef, useState } from 'react';

import CustomSpinner from '@components/CustomSpinner';
import { useGetResultsQuery } from '@services/search';
import { useTranslation } from 'react-i18next';
import CollectionResult from './CollectionResult';
import CollectionResultItem from './CollectionResultItem';
import FullTextSearchProps from './types';

function FullTextSearch({ disclosure }: FullTextSearchProps) {
  const { t } = useTranslation();
  const { onClose, isOpen } = disclosure;
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const initialRef = useRef(null);
  const {
    data: results,
    isLoading,
    isFetching,
    isError,
  } = useGetResultsQuery(debouncedValue, {
    skip: !debouncedValue,
  });

  const typeSomething = debouncedValue === '' && (
    <Center>
      <Text as="p" fontSize={24}>
        {t('fullTextSearch.Try to type something')}...
      </Text>
    </Center>
  );

  const emptyAlert =
    debouncedValue !== '' &&
    results &&
    results.collections.length === 0 &&
    results.items.length === 0 ? (
      <Alert
        flex={1}
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {t('fullTextSearch.No data')}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {t('fullTextSearch.Type something another')}
        </AlertDescription>
      </Alert>
    ) : null;

  const error = isError ? (
    <Alert
      flex={1}
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100%"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {t('fullTextSearch.Failed to get results')}.
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {t('fullTextSearch.Try to find later')}
      </AlertDescription>
    </Alert>
  ) : null;

  return (
    <Modal
      initialFocusRef={initialRef}
      size="xl"
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader>{t('fullTextSearch.Full text search')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchInput
            ref={initialRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
          />
          <VStack
            justifyContent={typeSomething ? 'center' : 'normal'}
            overflow="auto"
            h="50vh"
            mt={5}
          >
            {isError ? (
              error
            ) : isLoading || isFetching ? (
              <CustomSpinner />
            ) : (
              typeSomething ||
              emptyAlert || (
                <>
                  <Grid w="100%" templateColumns="1fr 1fr" gap={4}>
                    {results?.collections.map((collection) => (
                      <CollectionResult
                        key={collection.id}
                        collection={collection}
                        onClose={onClose}
                      />
                    ))}
                  </Grid>
                  {results?.items.map((item) => (
                    <CollectionResultItem
                      key={item.id}
                      item={item}
                      onClose={onClose}
                    />
                  ))}
                </>
              )
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FullTextSearch;
