import ReactDOM from 'react-dom/client';
import App from './App';
import { setupWorker } from 'msw/browser'
import { handlers } from '../tests/handlers'
 
export const worker = setupWorker(...handlers);
worker.start()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);