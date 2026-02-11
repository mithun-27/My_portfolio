import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center justify-center">
                    <h1 className="text-4xl mb-4">⚠️ System Failure</h1>
                    <div className="bg-gray-900 p-6 rounded-lg border border-green-500/30 max-w-2xl w-full text-left">
                        <h2 className="text-xl mb-2 text-white">Error Log:</h2>
                        <pre className="text-red-400 whitespace-pre-wrap break-words">
                            {this.state.error?.toString()}
                        </pre>
                        <p className="mt-4 text-gray-400 text-sm">
                            Please screenshot this and send it to the developer.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-colors"
                    >
                        Reboot System
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
