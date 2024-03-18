import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { COLLECTION_STATE, COLLECTION_TYPE } from '@models/enums';
import { HTMLAttributes, forwardRef, useMemo, useState } from 'react';
import CustomFieldsPickerProps from './types';

const TypesSelect = forwardRef<
  HTMLSelectElement,
  HTMLAttributes<HTMLSelectElement> & { value: COLLECTION_TYPE }
>(({ ...props }, ref) => {
  const types = useMemo(() => Object.values(COLLECTION_TYPE), []);

  return (
    <Select {...props} ref={ref}>
      {types.map((type, ind) => (
        // eslint-disable-next-line react/no-array-index-key
        <option key={ind} value={type}>
          {type}
        </option>
      ))}
    </Select>
  );
});

const StatesSelect = forwardRef<
  HTMLSelectElement,
  HTMLAttributes<HTMLSelectElement> & { value: COLLECTION_STATE }
>(({ ...props }, ref) => {
  const states = useMemo(() => Object.values(COLLECTION_STATE), []);

  return (
    <Select {...props} ref={ref}>
      {states.map((state, ind) => (
        // eslint-disable-next-line react/no-array-index-key
        <option key={ind} value={state}>
          {state}
        </option>
      ))}
    </Select>
  );
});

function CustomFieldsPicker({
  customFields,
  setCustomFields,
}: CustomFieldsPickerProps) {
  const [state, setState] = useState<COLLECTION_STATE>(COLLECTION_STATE.ACTIVE);
  const [type, setType] = useState<COLLECTION_TYPE>(COLLECTION_TYPE.STRING);
  const [name, setName] = useState<string>('');

  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Name</Th>
            <Th>State</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {customFields.map(
            ({ type: fieldType, name: fieldName, state: fieldState }, ind) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tr key={ind}>
                <Td>{fieldType}</Td>
                <Td>{fieldName}</Td>
                <Td>{fieldState}</Td>
                <Td>
                  <IconButton
                    onClick={() =>
                      setCustomFields(
                        customFields.filter((_, fieldInd) => fieldInd !== ind)
                      )
                    }
                    aria-label="remove field"
                    colorScheme="red"
                    icon={<CloseIcon />}
                  />
                </Td>
              </Tr>
            )
          )}
          <Tr>
            <Td>
              <TypesSelect
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setType(e.target.value as COLLECTION_TYPE)
                }
                value={type}
              />
            </Td>
            <Td>
              <Input
                type="text"
                isRequired
                variant="filled"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Td>
            <Td>
              <StatesSelect
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setState(e.target.value as COLLECTION_STATE)
                }
                value={state}
              />
            </Td>
            <Td>
              <IconButton
                isDisabled={name === ''}
                onClick={() => {
                  setCustomFields([...customFields, { name, type, state }]);
                }}
                aria-label="add field"
                colorScheme="green"
                icon={<AddIcon />}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CustomFieldsPicker;
