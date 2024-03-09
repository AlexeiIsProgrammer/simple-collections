import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react';

function Footer() {
  const shadowColor = useColorModeValue('black', 'white');

  return (
    <Box
      pos="fixed"
      right={0}
      bottom={0}
      p={2}
      boxShadow={`0px -1px 1px ${shadowColor}`}
    >
      <Flex>
        Made by
        <Link
          paddingLeft={1}
          href="https://github.com/AlexeiIsProgrammer"
          target="_blank"
          rel="noopener noreferrer"
        >
          @AlexeiIsProgrammer
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;
