import React from 'react';
import Box from '../../components/Containers/Box/Box';

import UsersList from '../../components/Users/UsersList/UsersList';

const UsersPage = () => {
    return (
        <Box>
            <h1>Users</h1>
            <UsersList />
        </Box>
    )
}

export default UsersPage;
