import React from 'react';

interface Css3DCubeProps {
    width: number;
    height: number;
    depth: number;
    x?: number;
    y?: number;
    z?: number;
    colors?: {
        front?: string;
        back?: string;
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    };
    className?: string;
    children?: React.ReactNode;
}

export const Css3DCube: React.FC<Css3DCubeProps> = ({
    width,
    height,
    depth,
    x = 0,
    y = 0,
    z = 0,
    colors = {},
    className = '',
    children
}) => {
    const defaultColor = 'rgba(255,255,255,0.5)';
    const {
        front = defaultColor,
        back = defaultColor,
        left = defaultColor,
        right = defaultColor,
        top = defaultColor,
        bottom = defaultColor,
    } = colors;

    const style = {
        '--width': `${width}px`,
        '--height': `${height}px`,
        '--depth': `${depth}px`,
        '--width-half': `${width / 2}px`,
        '--height-half': `${height / 2}px`,
        '--depth-half': `${depth / 2}px`,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
    } as React.CSSProperties;

    const faceStyle = (bg: string) => ({
        background: bg,
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
    });

    // If children are provided, we still render default faces unless suppressed?
    // Use case: TexturedCube overlays texture divs ON TOP of default faces (or instead of).
    // If we pass empty colors={}, defaultColor is transparent-ish white.
    // We can just render children after faces to overlay.

    return (
        <div className={`cube-3d ${className}`} style={style}>
            {/* Default Faces (Backgrounds) */}
            <div className="face-3d face-front" style={faceStyle(front)} />
            <div className="face-3d face-back" style={faceStyle(back)} />
            <div className="face-3d face-right" style={faceStyle(right)} />
            <div className="face-3d face-left" style={faceStyle(left)} />
            <div className="face-3d face-top" style={faceStyle(top)} />
            <div className="face-3d face-bottom" style={faceStyle(bottom)} />

            {/* Custom Content (Textures/Overlays) */}
            {children}
        </div>
    );
};
