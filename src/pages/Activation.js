import react from 'react';
import { useParams } from 'react-router-dom';
import Box from '../components/Containers/Box/Box';
import './activation.css';


const ActivationPage = () => {

    const {code} = useParams();

    return (
        <div>
            <Box>
                <h1>Activation</h1>
                <p>Activation code: <span className="activationCode">{code}</span></p>
            </Box>
        </div>
    )
}

export default ActivationPage;
