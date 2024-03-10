import {
  Alert,
  AlertIcon,
  Checkbox,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '@redux/index';
import { authSelector } from '@redux/slices/userSlice';
import {
  ActionType,
  useChangeUsersStateMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
} from '@services/user';
import { User } from '@models/interfaces';
import { ROLE, STATUS } from '@models/enums';
import { DeleteIcon, UnlockIcon, WarningTwoIcon } from '@chakra-ui/icons';
import UserItem from './UserItem/UserItem';

function Admin() {
  const toast = useToast();
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
    async (actions: number[]) => {
      setCheckedUsers([]);
      try {
        await deleteUser(actions).unwrap();
        toast({
          title: 'Successfully deleting!',
          status: 'success',
          position: 'top',
        });
      } catch {
        toast({
          title: 'Deleting went wrong...',
          status: 'error',
          position: 'top',
        });
      }
    },
    [deleteUser, toast]
  );

  const changeUserHandle = useCallback(
    async (actions: ActionType[]) => {
      setCheckedUsers([]);
      try {
        await changeUser(actions).unwrap();
        toast({
          title: 'Successfully changing!',
          status: 'success',
          position: 'top',
        });
      } catch {
        toast({
          title: 'Changing went wrong...',
          status: 'success',
          position: 'top',
        });
      }
    },
    [changeUser, toast]
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
        There was an error processing your request
      </Alert>
    );
  }

  return usersFetching || usersLoading || !usersData ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
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
                title="Block/Unblock chosen"
                aria-label="Block/Unblock chosen"
                icon={<UnlockIcon />}
              >
                Block/Unblock chosen
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
                title="Delete chosen"
                aria-label="Delete chosen"
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
                title="Make/Remove admin chosen"
                aria-label="Make/Remove admin chosen"
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
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Role</Th>
            <Th textAlign="center">Status</Th>
            <Th textAlign="center">See Collections</Th>
            <Th textAlign="center">Block/Unblock user</Th>
            <Th textAlign="center">Delete user</Th>
            <Th textAlign="center">Make/Remove admin</Th>
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
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Role</Th>
            <Th textAlign="center">Status</Th>
            <Th textAlign="center">See Collections</Th>
            <Th textAlign="center">Block/Unblock user</Th>
            <Th textAlign="center">Delete user</Th>
            <Th textAlign="center">Make/Remove admin</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default Admin;
