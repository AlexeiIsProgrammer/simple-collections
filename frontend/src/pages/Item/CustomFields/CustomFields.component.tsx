import { useCallback } from 'react';
import { Grid, useMediaQuery } from '@chakra-ui/react';
import { useUpdateCollectionItemCustomFieldMutation } from '@services/collection-item';
import CustomFieldItem from './CustomFieldItem';
import CustomFieldsProps from './types';

function CustomFields({ customFields, itemId }: CustomFieldsProps) {
  const [updateCustomField] = useUpdateCollectionItemCustomFieldMutation();

  const [isLessThan768] = useMediaQuery('(max-width: 768px)');
  const [isLessThan576] = useMediaQuery('(max-width: 576px)');

  const updateCustomFieldHandle = useCallback(
    (fieldId: number, value: string) => {
      updateCustomField({ id: itemId, body: [{ value, fieldId }] });
    },
    [itemId, updateCustomField]
  );

  return (
    customFields.length > 0 && (
      <Grid
        templateColumns={`repeat(${isLessThan576 ? 1 : isLessThan768 ? 2 : 3}, 1fr)`}
        gap={6}
      >
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
    )
  );
}

export default CustomFields;
