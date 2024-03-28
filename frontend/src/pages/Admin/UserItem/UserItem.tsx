import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  LockIcon,
  UnlockIcon,
  ViewIcon,
  WarningIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons';
import { Checkbox, IconButton, Td, Tr } from '@chakra-ui/react';
import { ROLE, STATUS } from '@models/enums';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserItemProps from './types';

const UserItem = React.memo(function UserItem({
  user,
  currentUser,
  checkCheckbox,
  isChecked,
  deleteUserHandle,
  changeUserHandle,
}: UserItemProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          onClick={() => navigate(`/collections/${id}`)}
          aria-label="See collections"
          icon={<ViewIcon />}
          title={t('userItem.name', { name })}
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
            title={t('userItem.unblock', { name })}
            colorScheme="blue"
          />
        ) : (
          <IconButton
            aria-label="Block user"
            icon={<LockIcon />}
            onClick={() =>
              changeUserHandle([{ id, field: 'status', value: STATUS.BLOCKED }])
            }
            title={t('userItem.block', { name })}
            colorScheme="red"
          />
        )}
      </Td>
      <Td textAlign="center">
        <IconButton
          aria-label="Delete user"
          icon={<DeleteIcon />}
          onClick={() => deleteUserHandle([id])}
          title={t('userItem.delete', { name })}
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
            title={t('userItem.remove', { name })}
            colorScheme="blue"
          />
        ) : (
          <IconButton
            aria-label="Make user admin"
            icon={<WarningTwoIcon />}
            onClick={() =>
              changeUserHandle([{ id, field: 'role', value: ROLE.ADMIN }])
            }
            title={t('userItem.make', { name })}
            colorScheme="yellow"
          />
        )}
      </Td>
    </Tr>
  );
});

export default UserItem;
