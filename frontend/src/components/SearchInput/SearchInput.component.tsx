import { SearchIcon } from '@chakra-ui/icons';
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

function SearchInput() {
  return (
    <FormControl>
      <InputGroup size="md">
        <Input type="text" placeholder="Find..." />
        <InputRightElement width="4.5rem">
          <SearchIcon cursor="pointer" />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default SearchInput;
