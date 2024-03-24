import { SearchIcon } from '@chakra-ui/icons';
import {
  FormControl,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  forwardRef,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const SearchInput = forwardRef<InputProps, 'input'>(({ ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <FormControl>
      <InputGroup size="md">
        <Input
          {...props}
          ref={ref}
          type="text"
          placeholder={`${t('header.Find')}...`}
        />
        <InputRightElement width="4.5rem">
          <SearchIcon cursor="pointer" />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
});

export default SearchInput;
