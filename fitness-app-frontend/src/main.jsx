
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig'

createRoot(document.getElementById('root')).render(
  <AuthProvider authConfig={authConfig} loadingComponent={
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      color: '#8b5cf6'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(139, 92, 246, 0.1)',
          borderTop: '4px solid #8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem auto'
        }} />
        <p style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>Initializing FitAI...</p>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  }>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
)
