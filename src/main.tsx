import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

// COMPONENTS
import App from './App.tsx'

// STORE
import store from './store/store.ts';

// CSS
import './index.scss'
import '@fortawesome/fontawesome-free/css/all.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer/>
    </Provider>
  </StrictMode>,
)
