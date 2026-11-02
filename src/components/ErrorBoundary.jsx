import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #05060C 0%, #0A0C16 100%)',
          color: '#E9EAF2',
          fontFamily: 'Satoshi, system-ui, sans-serif'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '40px',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>⚠️</div>

            <h1 style={{
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '12px',
              background: 'linear-gradient(100deg, #8B5CF6 0%, #22D3EE 50%, #F0498D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Something went wrong
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#9BA0B5',
              marginBottom: '32px',
              lineHeight: 1.6
            }}>
              We encountered an unexpected error. Try refreshing the page or clearing your browser cache.
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(100deg, #8B5CF6 0%, #22D3EE 100%)',
                  color: '#05060C',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ↻ Refresh Page
              </button>

              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, .15)',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#E9EAF2',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#22D3EE'
                  e.target.style.color = '#22D3EE'
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, .15)'
                  e.target.style.color = '#E9EAF2'
                }}
              >
                → Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '32px',
                padding: '16px',
                background: 'rgba(255, 255, 255, .05)',
                borderRadius: '8px',
                textAlign: 'left',
                border: '1px solid rgba(255, 255, 255, .08)'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  color: '#9BA0B5',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}>
                  Error Details (Dev Only)
                </summary>
                <pre style={{
                  marginTop: '12px',
                  fontSize: '11px',
                  color: '#F0498D',
                  overflow: 'auto',
                  fontFamily: 'monospace'
                }}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
