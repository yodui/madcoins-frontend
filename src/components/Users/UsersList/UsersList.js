import React, { useState, useEffect } from 'react';

import DataGrid from '../../Containers/DataGrid/DataGrid';
import Icon from '../../../components/Common/Icon/Icon';

import './UsersList.css';

const UsersList = () => {

    const [offset, setOffset] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(false);

    const columns = [
        { id: 'userId', label: 'User Id', width: '12%' },
        { id: 'email', label: 'Email', width: '20%' },
        { id: 'active', label: 'Active', width: '13%' },
        { id: 'fDateReg', label: 'Reg.date', width: '12%' },
        { id: 'remove', label: '', width: '10%' }
    ];

    const USERS_LIMIT = 10;

    const API_LIST_USERS = 'http://localhost:3000/api/users';
    const API_REMOVE_USER_BY_ID = 'http://localhost:3000/api/user/remove/:id';

    const [users, setUsers] = useState([]);

    const fetchUsersData = async () => {
        const response = await fetch(API_LIST_USERS);
        const json = await response.json();
        setTotalUsers(json.count);
        const formattedData = formatFields(json.rows);
        setUsers(formattedData);
    }

    const formatFields = (data) => {
        data.map(row => {
            // format date reg.
            const d = new Date(row.tsDateReg);
            let fDate = [('0' + d.getDate()).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('.');
            let fTime = [('0' + d.getHours()).slice(-2), ('0' + d.getMinutes()).slice(-2)].join(':');
            row['fDateReg'] = [fDate, fTime].join(', ');
            console.log(row);
            row['remove'] = <RemoveUser id={row.userId} />
        })
        return data;
    }

    const handleRemoveUser = async (id) => {
        const uri = API_REMOVE_USER_BY_ID.replace(':id', id);
        const response = await fetch(uri, {method: 'DELETE'});
        const json = await response.json();
        if(json.result === false) {
            console.log(`Can\'t remove user with id = ${id}`);
        } else {
            console.log('Success!');
        }
    }

    const RemoveUser = ({id}) => {
        return <span onClick={() => handleRemoveUser(id)} className='pointer'><Icon name='close' /></span>
    }

    const options = {
        dense:true,
        pagination: {
            limit: USERS_LIMIT,
            pagesNumber: 5
        },
        handlePageClick: handlePageClick
    };

    const handlePageClick = async (page) => {
        const newOffset = (page - 1) * USERS_LIMIT;
        setActivePage(page);
        setOffset(newOffset);
    }

    useEffect(() => { fetchUsersData(); }, [offset]);

    return (
        <div className='usersList'>
            <DataGrid  columns={columns} rows={users} count={totalUsers} options={options} />
        </div>
    )
}

export default UsersList;
