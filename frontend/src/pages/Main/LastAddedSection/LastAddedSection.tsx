import {
  Alert,
  AlertIcon,
  Box,
  StackDivider,
  Text,
  VStack,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { useGetLastItemsQuery } from '@services/collection-item';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';

import LastAddedCard from './LastAddedCard/LastAddedCard';

import 'swiper/css';
import 'swiper/css/navigation';

function LastAddedSection() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const { data: items, isLoading, isError } = useGetLastItemsQuery();

  const [isLessThan991] = useMediaQuery('(max-width: 991px)');
  const [isLessThan576] = useMediaQuery('(max-width: 576px)');

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('last.error')}
      </Alert>
    );
  }

  return (
    <Box
      order={1}
      borderRadius={10}
      boxShadow={
        isLessThan991
          ? 'none'
          : `0px 0px 3px ${colorMode === 'dark' ? '#fff' : '#000'}`
      }
      p={2}
      pos={isLessThan991 ? 'static' : 'sticky'}
      top={5}
    >
      <Text fontSize={35} textAlign="center" mb={2}>
        {items && items.length > 0
          ? t('last.Adding history')
          : t('last.No items')}
      </Text>
      <Box overflow="auto" maxH={isLessThan576 ? '100%' : '70vh'} py={2}>
        {isLoading ? (
          <CustomSpinner />
        ) : isLessThan991 ? (
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={isLessThan576 ? 1 : 2}
            navigation
          >
            {items?.map((item) => (
              <SwiperSlide key={item.id}>
                <LastAddedCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {items?.map((item) => <LastAddedCard key={item.id} item={item} />)}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default LastAddedSection;
