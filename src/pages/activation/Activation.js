import react from 'react';
import { useParams } from 'react-router-dom';
import Box from '../../components/Containers/Box/Box';
import Icon from '../../components/Common/Icon/Icon';
import './activation.css';


const ActivationPage = () => {

    const {code} = useParams();

    let codeCls = ['activationCode'];
    let isCodeCorrect = true;
    let iconName = 'close'

    if(isCodeCorrect) {
        iconName = 'check';
        codeCls.push('correct');
    }

    return (
        <div>
            <Box>
                <h1>Activation</h1>
                <p className='activationResult'>Activation code: <span className={codeCls.join(' ')}>{code}</span><Icon className='check' name={iconName} size={24} /></p>
                <p>Now you can sign in.</p>
            </Box>
        </div>
    )
}

export default ActivationPage;
