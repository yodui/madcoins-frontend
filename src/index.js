import App from './app';

import react from 'react';
import * as ReactDOMClient from 'react-dom/client';


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<App />);

const devMode = process.env.NODE_ENV === 'development';
if(devMode && module && module.hot) {
    module.hot.accept();
}
