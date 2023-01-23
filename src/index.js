import App from './app';

import react from 'react';
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

const devMode = process.env.NODE_ENV === 'development';
if(devMode && module && module.hot) {
    module.hot.accept();
}
