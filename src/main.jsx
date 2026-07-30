import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in Portfolio:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#08090a',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#39d3c7', marginBottom: '12px' }}>
            Deswanth Portfolio
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '500px', marginBottom: '24px', lineHeight: '1.6' }}>
            Something went wrong while rendering. Please click below to reload.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #39d3c7, #9b6dff)',
              color: '#090c10',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
