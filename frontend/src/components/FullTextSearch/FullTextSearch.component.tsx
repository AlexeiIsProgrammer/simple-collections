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

import { useGetResultsQuery } from '@services/search';
import CustomSpinner from '@components/CustomSpinner';
import FullTextSearchProps from './types';
import CollectionResult from './CollectionResult';
import CollectionResultItem from './CollectionResultItem';

function FullTextSearch({ disclosure }: FullTextSearchProps) {
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
        Try to type something...
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
          No data
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Type something another
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
        Failed to get results.
      </AlertTitle>
      <AlertDescription maxWidth="sm">Try to find later</AlertDescription>
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
        <ModalHeader>Full text search</ModalHeader>
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
                  <Grid templateColumns="1fr 1fr" gap={4}>
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
