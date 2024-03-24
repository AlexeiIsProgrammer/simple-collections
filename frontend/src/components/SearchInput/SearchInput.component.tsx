import { SearchIcon } from '@chakra-ui/icons';
import {
  FormControl,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  forwardRef,
} from '@chakra-ui/react';

const SearchInput = forwardRef<InputProps, 'input'>(({ ...props }, ref) => {
  return (
    <FormControl>
      <InputGroup size="md">
        <Input {...props} ref={ref} type="text" placeholder="Find..." />
        <InputRightElement width="4.5rem">
          <SearchIcon cursor="pointer" />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
});

export default SearchInput;
