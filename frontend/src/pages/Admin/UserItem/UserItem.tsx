import React from 'react';
import {
  ViewIcon,
  UnlockIcon,
  LockIcon,
  DeleteIcon,
  WarningTwoIcon,
  WarningIcon,
  CheckIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { Checkbox, IconButton, Td, Tr } from '@chakra-ui/react';
import { STATUS, ROLE } from '@models/enums';
import UserItemProps from './types';

const UserItem = React.memo(function UserItem({
  user,
  currentUser,
  checkCheckbox,
  isChecked,
  deleteUserHandle,
  changeUserHandle,
}: UserItemProps) {
  const { id, name, email, role, status } = user;

  return (
    <Tr
      key={id}
      pos="relative"
      border={currentUser?.id === id ? '4px solid' : 'none'}
      title={currentUser?.id === id ? "That's you" : ''}
    >
      <Td>
        <Checkbox
          isChecked={isChecked}
          onChange={(e) => checkCheckbox(e, user)}
        />
      </Td>
      <Td textAlign="center">{name}</Td>
      <Td textAlign="center">{email}</Td>
      <Td textAlign="center">{role}</Td>
      <Td textAlign="center">
        {status === STATUS.ACTIVE ? (
          <CheckIcon color="green" />
        ) : (
          <CloseIcon color="red" />
        )}
      </Td>
      <Td textAlign="center">
        <IconButton
          aria-label="See collections"
          icon={<ViewIcon />}
          title={`See the ${name}'s collections`}
          colorScheme="green"
        />
      </Td>
      <Td textAlign="center">
        {status === STATUS.BLOCKED ? (
          <IconButton
            icon={<UnlockIcon />}
            aria-label="Unblock user"
            onClick={() =>
              changeUserHandle([{ id, field: 'status', value: STATUS.ACTIVE }])
            }
            title={`Unblock ${name}`}
            colorScheme="blue"
          />
        ) : (
          <IconButton
            aria-label="Block user"
            icon={<LockIcon />}
            onClick={() =>
              changeUserHandle([{ id, field: 'status', value: STATUS.BLOCKED }])
            }
            title={`Block ${name}`}
            colorScheme="red"
          />
        )}
      </Td>
      <Td textAlign="center">
        <IconButton
          aria-label="Delete user"
          icon={<DeleteIcon />}
          onClick={() => deleteUserHandle([id])}
          title={`Delete ${name}`}
          colorScheme="red"
        />
      </Td>
      <Td textAlign="center">
        {role === ROLE.ADMIN ? (
          <IconButton
            aria-label="Remove user's admin role"
            icon={<WarningIcon />}
            onClick={() =>
              changeUserHandle([{ id, field: 'role', value: ROLE.USER }])
            }
            title={`Remove ${name}'s admin role`}
            colorScheme="blue"
          />
        ) : (
          <IconButton
            aria-label="Make user admin"
            icon={<WarningTwoIcon />}
            onClick={() =>
              changeUserHandle([{ id, field: 'role', value: ROLE.ADMIN }])
            }
            title={`Make ${name} admin`}
            colorScheme="yellow"
          />
        )}
      </Td>
    </Tr>
  );
});

export default UserItem;
