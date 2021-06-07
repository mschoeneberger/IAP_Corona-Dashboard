import React from 'react';

const LoadingMap = () => {
    return (
    <div
        style={{
            flexBasis: "60vh",
            flexGrow: "16", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
        }}
    >
        <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>);
}
 
export default LoadingMap;