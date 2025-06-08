import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL Error Boundary Caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111',
          color: 'white',
          fontFamily: 'monospace'
        }}>
          <h1>Something went wrong.</h1>
          <p>A WebGL error occurred. Please try refreshing the page.</p>
          {this.state.error && <pre>{this.state.error.message}</pre>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary; 