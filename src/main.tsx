import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UserProvider } from './context/UserContext'
import { CommentProvider } from './context/CommentContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CommentProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CommentProvider>
  </React.StrictMode>
)
