import react from 'react';
import Box from '../../components/Containers/Box/Box';
import TrackedPairs from '../../components/Settings/TrackedPairs/TrackedPairs';

const AccountSettingsPage = () => {
    return (
        <div>
            <Box>
                <h1>Settings</h1>
                <TrackedPairs />
            </Box>
        </div>
    )
}

export default AccountSettingsPage;
