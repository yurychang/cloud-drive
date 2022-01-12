import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.scss';

if (process.env.NODE_ENV === 'development') {
    import('./mocks/browser').then(({ worker }) => {
        worker.start({
            onUnhandledRequest: 'bypass',
        });
        bootstrap();
    });
} else {
    bootstrap();
}

function bootstrap() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
