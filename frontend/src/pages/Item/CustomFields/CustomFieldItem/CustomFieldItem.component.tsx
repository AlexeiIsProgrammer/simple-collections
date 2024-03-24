import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { COLLECTION_STATE, COLLECTION_TYPE } from '@models/enums';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import styles from './CustomFieldItem.module.scss';
import CustomFieldItemProps from './types';

const CustomFieldItem = React.memo(function CustomFieldItem({
  item,
  updateCustomFieldHandle,
}: CustomFieldItemProps) {
  const [fieldValue, setFieldValue] = useState<string>(item.value);

  const onSaveHandle = () => {
    if (fieldValue === item.value) return;

    updateCustomFieldHandle(item.id, fieldValue);
  };

  const chooseInputType = () => {
    switch (item.type) {
      case COLLECTION_TYPE.BOOLEAN:
        return (
          <Checkbox
            isChecked={fieldValue === 'true'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFieldValue(e.target.checked.toString())
            }
          >
            {item.name}
          </Checkbox>
        );
      case COLLECTION_TYPE.NUMBER:
        return (
          <>
            <Text mb={2}>{item.name}</Text>
            <Input
              type="number"
              value={fieldValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFieldValue(e.target.value)
              }
            />
          </>
        );
      case COLLECTION_TYPE.TEXT:
        return (
          <>
            <Text mb={2}>{item.name}</Text>
            <Textarea
              value={fieldValue}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setFieldValue(e.target.value)
              }
            />
          </>
        );

      default:
        return null;
    }
  };

  return chooseInputType() ? (
    <Card
      className={clsx(styles.card, {
        [styles.blocked]: item.state === COLLECTION_STATE.BLOCKED,
        [styles.hidden]: item.state === COLLECTION_STATE.HIDDEN,
      })}
    >
      <CardHeader>
        <Heading size="md">
          {item.state === COLLECTION_STATE.BLOCKED && (
            <Badge colorScheme="red" mr={2}>
              Blocked
            </Badge>
          )}
          {chooseInputType()}
        </Heading>
      </CardHeader>
      <CardBody display="flex" alignItems="flex-end">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={5}
          flexWrap="wrap"
        >
          <Text>
            This is a <Badge>{item.type}</Badge> type
          </Text>
          {fieldValue !== item.value && (
            <Button flex="1 0 auto" onClick={onSaveHandle}>
              Save
            </Button>
          )}
        </Flex>
      </CardBody>
    </Card>
  ) : null;
});

export default CustomFieldItem;
