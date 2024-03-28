import { Flex, Grid, useMediaQuery } from '@chakra-ui/react';
import TagsCloud from './TagsCloud';
import LastAddedSection from './LastAddedSection';
import BiggestCollections from './BiggestCollections';

function Main() {
  const [isLessThan991] = useMediaQuery('(max-width: 991px)');

  return (
    <Grid
      display={isLessThan991 ? 'block' : 'grid'}
      mt={10}
      alignItems="flex-start"
      gridTemplateColumns={isLessThan991 ? '1fr' : '3fr 1fr'}
    >
      <LastAddedSection />
      <Flex
        order={-1}
        direction="column"
        gap={100}
        alignItems="center"
        justifyContent="flex-start"
      >
        <BiggestCollections />
        <TagsCloud />
      </Flex>
    </Grid>
  );
}

export default Main;
