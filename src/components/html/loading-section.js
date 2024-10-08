import React from 'react';
import { useState, useEffect } from 'react';

function useSmoothLoading(isLoading, delay = 300) {
    const [showLoading, setShowLoading] = useState(false);
  
    useEffect(() => {
      let timer;
      if (isLoading) {
        timer = setTimeout(() => setShowLoading(true), delay);
      } else {
        setShowLoading(false);
      }
      return () => clearTimeout(timer);
    }, [isLoading, delay]);
  
    return showLoading;
}
  
function LoadingSection({ isLoading, children, delay = 300 }) {
  const showLoading = useSmoothLoading(isLoading, delay);

  if (showLoading) {
    return (
      <div className="loading-section">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return children;
}

export default LoadingSection;