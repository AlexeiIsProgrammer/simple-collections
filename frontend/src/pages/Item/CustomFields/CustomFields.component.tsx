import { useCallback } from 'react';
import { InfoIcon } from '@chakra-ui/icons';
import { Alert, Button, Grid } from '@chakra-ui/react';
import { useUpdateCollectionItemCustomFieldMutation } from '@services/collection-item';
import CustomFieldItem from './CustomFieldItem';
import CustomFieldsProps from './types';

function CustomFields({ customFields, itemId }: CustomFieldsProps) {
  const [updateCustomField] = useUpdateCollectionItemCustomFieldMutation();

  const updateCustomFieldHandle = useCallback(
    (fieldId: string, value: string) => {
      updateCustomField({ id: itemId, body: [{ value, fieldId }] });
    },
    [itemId, updateCustomField]
  );

  return customFields.length === 0 ? (
    <Alert status="info">
      <InfoIcon mr={2} />
      You don&apos;t have any fields
      <Button ml={2}>Create one ?</Button>
    </Alert>
  ) : (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {customFields.map((customField) => (
        <CustomFieldItem
          key={customField.id}
          item={customField}
          updateCustomFieldHandle={(fieldId, value) =>
            updateCustomFieldHandle(fieldId, value)
          }
        />
      ))}
    </Grid>
  );
}

export default CustomFields;
