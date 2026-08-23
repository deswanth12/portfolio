import { StrictMode, Component } from 'react'
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
          <h1 style={{ fontSize: '2rem', color: '#00d4ff', marginBottom: '12px' }}>
            Deswanth Portfolio
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', marginBottom: '16px', lineHeight: '1.6' }}>
            {this.state.error ? String(this.state.error.message || this.state.error) : "Rendering error occurred."}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #10b981)',
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
