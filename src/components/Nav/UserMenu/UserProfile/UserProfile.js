import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DropDownItem from '../../../Common/DropDown/DropDownItem';
import DropDownSeparator from '../../../Common/DropDown/DropDownSeparator';
import DropDown from '../../../Common/DropDown/DropDown';

import UserAva from '../../../Common/UserAva/UserAva';
import Button from '../../../Common/Button/Button';
import Switch from '../../../Common/Switch/Switch';

import { logOut } from '../../../../store/actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';

import { uFetch } from '../../../../functions/uFetch';

import { S, M, BACKEND_HOST, BACKEND_PORT, API_URI_LOGOUT } from '../../../../constants/common';

const UserProfile = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [isOpened, setOpened] = useState(false);

    const auth = useSelector(state => state.auth);

    const userAva = <UserAva email={auth.user.email} size={M} />

    const handleToggleTheme = () => {
        console.log('toggle theme');
        return true;
    }

    const handleSettingsClick = () => {
        navigate('/account/settings');
    }

    const handleLogout = async () => {
        const logOutUrl = BACKEND_HOST + ':' + BACKEND_PORT + API_URI_LOGOUT;
        console.log('Call', logOutUrl);
        // Call backend endpoint for clear refreshToken
        const requestParams = {
            method: 'GET',
            cache: 'no-cache'
        };

        const objResponse = await uFetch(logOutUrl, requestParams);
        const response = await objResponse.json();

        // processing response
        if(response.result !== false) {
            // Local logout
            dispatch(logOut());
        }
    }

    const logOutProps = {
        callback: handleLogout
    };

    const buttons = [
        <DropDownItem iconName='moon' text='Dark Theme' component=<Switch checked={true} callback={handleToggleTheme} /> />,
        <DropDownItem iconName='cog-outline' text='Settings' callback={handleSettingsClick} closeTrigger={true} />,
        <DropDownSeparator />,
        <DropDownItem iconName='logout' text='LogOut' { ...logOutProps } />,
    ];

    return <DropDown width='auto' isOpened={isOpened} trigger={userAva} menuItems={buttons} />
}


export default UserProfile;
