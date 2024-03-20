import { createIcon } from '@chakra-ui/react';

const HashIcon = createIcon({
  displayName: 'HashIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      d="M10 4L7 20M17 4L14 20M5 8H20M4 16H19"
      stroke="lightblue"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
});

export default HashIcon;
