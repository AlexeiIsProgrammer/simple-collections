import { AbsoluteCenter, Box } from '@chakra-ui/react';
import FilledHeartIcon from '@icons/FilledHeartIcon';
import LikeHeartProps from './types';

function LikeHeart({ likesCount }: LikeHeartProps) {
  return (
    <Box pos="relative">
      <AbsoluteCenter pos="absolute">{likesCount}</AbsoluteCenter>
      <FilledHeartIcon boxSize="3em" />
    </Box>
  );
}

export default LikeHeart;
