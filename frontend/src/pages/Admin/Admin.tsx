import { DeleteIcon, UnlockIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Checkbox,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import CustomSpinner from '@components/CustomSpinner';
import { ROLE, STATUS } from '@models/enums';
import { User } from '@models/interfaces';
import { useAppSelector } from '@redux/index';
import { authSelector, logout } from '@redux/slices/userSlice';
import {
  ActionType,
  useChangeUsersStateMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
} from '@services/user';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import UserItem from './UserItem/UserItem';

function Admin() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useAppSelector(authSelector);
  const {
    data: usersData,
    isFetching: usersFetching,
    isLoading: usersLoading,
    isError,
  } = useGetUsersQuery();
  const [deleteUser] = useDeleteUsersMutation();
  const [changeUser] = useChangeUsersStateMutation();

  const [checkedUsers, setCheckedUsers] = useState<User[]>([]);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usersData) return;

    if (e.target.checked) {
      setCheckedUsers(usersData);
    } else {
      setCheckedUsers([]);
    }
  };

  const deleteUserHandle = useCallback(
    async (actions: string[]) => {
      setCheckedUsers([]);
      try {
        await deleteUser(actions).unwrap();

        if (currentUser && actions.includes(currentUser.id)) {
          dispatch(logout());
          navigate('/logout');
        }

        toast({
          title: `${t('admin.Successfully deleting')}!`,
          status: 'success',
          position: 'top',
        });
      } catch {
        toast({
          title: `${t('admin.Deleting went wrong')}...`,
          status: 'error',
          position: 'top',
        });
      }
    },
    [deleteUser, toast, t, dispatch, currentUser, navigate]
  );

  const changeUserHandle = useCallback(
    async (actions: ActionType[]) => {
      setCheckedUsers([]);
      try {
        await changeUser(actions).unwrap();
        toast({
          title: `${t('admin.Successfully changing')}!`,
          status: 'success',
          position: 'top',
        });
      } catch {
        toast({
          title: `${t('admin.Changing went wrong')}...`,
          status: 'success',
          position: 'top',
        });
      }
    },
    [changeUser, toast, t]
  );

  const checkCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checkedUser: User) => {
      if (e.target.checked) {
        setCheckedUsers([...checkedUsers, checkedUser]);
      } else {
        setCheckedUsers(
          checkedUsers.filter(
            (checkedUserItem) => checkedUserItem.id !== checkedUser.id
          )
        );
      }
    },
    [checkedUsers]
  );

  const allChecked = useMemo(
    () => checkedUsers.length === usersData?.length,
    [checkedUsers, usersData]
  );

  const isIndeterminate = useMemo(
    () => checkedUsers.length > 0 && !allChecked,
    [checkedUsers, allChecked]
  );

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {t('admin.There was an error processing your request')}
      </Alert>
    );
  }

  return usersFetching || usersLoading || !usersData ? (
    <CustomSpinner />
  ) : (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th />
            <Th />
            <Th />
            <Th />
            <Th />
            <Th />
            <Th textAlign="center">
              <IconButton
                onClick={() =>
                  changeUserHandle(
                    checkedUsers.map((checkedUser) => ({
                      field: 'status',
                      value:
                        checkedUser.status === STATUS.BLOCKED
                          ? STATUS.ACTIVE
                          : STATUS.BLOCKED,
                      id: checkedUser.id,
                    }))
                  )
                }
                isDisabled={checkedUsers.length === 0}
                title={t('admin.Block/Unblock chosen')}
                aria-label={t('admin.Block/Unblock chosen')}
                icon={<UnlockIcon />}
              >
                {t('admin.Block/Unblock chosen')}
              </IconButton>
            </Th>
            <Th textAlign="center">
              <IconButton
                onClick={() =>
                  deleteUserHandle(
                    checkedUsers.map((checkedUser) => checkedUser.id)
                  )
                }
                isDisabled={checkedUsers.length === 0}
                title={t('admin.Delete chosen')}
                aria-label={t('admin.Delete chosen')}
                icon={<DeleteIcon />}
              />
            </Th>
            <Th textAlign="center">
              <IconButton
                onClick={() =>
                  changeUserHandle(
                    checkedUsers.map((checkedUser) => ({
                      field: 'role',
                      value:
                        checkedUser.role === ROLE.ADMIN
                          ? ROLE.USER
                          : ROLE.ADMIN,
                      id: checkedUser.id,
                    }))
                  )
                }
                isDisabled={checkedUsers.length === 0}
                title={t('admin.Make/Remove admin chosen')}
                aria-label={t('admin.Make/Remove admin chosen')}
                icon={<WarningTwoIcon />}
              />
            </Th>
          </Tr>
          <Tr>
            <Th>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={checkAll}
              />
            </Th>
            <Th textAlign="center">{t('admin.Name')}</Th>
            <Th textAlign="center">{t('admin.Email')}</Th>
            <Th textAlign="center">{t('admin.Role')}</Th>
            <Th textAlign="center">{t('admin.Status')}</Th>
            <Th textAlign="center">{t('admin.See Collections')}</Th>
            <Th textAlign="center">{t('admin.Block/Unblock user')}</Th>
            <Th textAlign="center">{t('admin.Delete user')}</Th>
            <Th textAlign="center">{t('admin.Make/Remove admin')}</Th>
          </Tr>
        </Thead>
        <Tbody pos="relative">
          {usersData.map((dbUser) => (
            <UserItem
              key={dbUser.id}
              user={dbUser}
              currentUser={currentUser}
              checkCheckbox={checkCheckbox}
              isChecked={Boolean(
                checkedUsers.find((checkedUser) => checkedUser.id === dbUser.id)
              )}
              deleteUserHandle={deleteUserHandle}
              changeUserHandle={changeUserHandle}
            />
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th />
            <Th textAlign="center">{t('admin.Name')}</Th>
            <Th textAlign="center">{t('admin.Email')}</Th>
            <Th textAlign="center">{t('admin.Role')}</Th>
            <Th textAlign="center">{t('admin.Status')}</Th>
            <Th textAlign="center">{t('admin.See Collections')}</Th>
            <Th textAlign="center">{t('admin.Block/Unblock user')}</Th>
            <Th textAlign="center">{t('admin.Delete user')}</Th>
            <Th textAlign="center">{t('admin.Make/Remove admin')}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default Admin;
