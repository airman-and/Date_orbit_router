import React, { useState } from 'react';

const ICONS = {
  flutter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      <ellipse cx="12" cy="10" rx="9" ry="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" transform="rotate(-15 12 10)"/>
    </svg>
  ),
  record: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
      <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
    </svg>
  ),
  sweet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
      <path d="M3 12a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1" strokeDasharray="3,1" transform="rotate(30 12 12)"/>
    </svg>
  ),
  calm: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6v6l4 2"/>
      <ellipse cx="12" cy="12" rx="11" ry="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,3" transform="rotate(-40 12 12)"/>
    </svg>
  ),
  dopamine: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
    </svg>
  ),
  gift: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="14" rx="2"/>
      <path d="M12 2v6M12 2a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3z"/>
      <ellipse cx="12" cy="15" rx="10" ry="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" transform="rotate(10 12 15)"/>
    </svg>
  ),
  aroma: (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/>
      <ellipse cx="12" cy="15" rx="9" ry="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" transform="rotate(-25 12 15)"/>
    </svg>
  )
};

export default function OrbitVisualizer({
  planetOrder,
  planetsData,
  onPlanetOrderChange
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set transparent image to let CSS customize drag styles
    const dragImg = new Image();
    dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImg, 0, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedOrder = [...planetOrder];
      // Swap planet positions
      const temp = updatedOrder[draggedIndex];
      updatedOrder[draggedIndex] = updatedOrder[index];
      updatedOrder[index] = temp;
      onPlanetOrderChange(updatedOrder);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="orbit-visualizer">
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
        오늘 산출된 데이트 궤도 경로
      </p>
      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        💡 행성을 드래그하여 코스 순서를 자유롭게 조율해보세요! (실시간 코스 재산출)
      </p>
      <div className="orbit-path-container">
        <div className="orbit-line"></div>
        {planetOrder.map((planetName, index) => {
          const p = planetsData[planetName];
          if (!p) return null;
          const isDragging = draggedIndex === index;
          const isOver = dragOverIndex === index;

          return (
            <div 
              key={planetName}
              className={`orbit-planet-node ${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onDragLeave={() => setDragOverIndex(null)}
              style={{ cursor: 'grab' }}
            >
              <div 
                className="planet-glow-circle" 
                style={{ 
                  borderColor: p.color, 
                  boxShadow: isOver 
                    ? `0 0 25px ${p.color}, 0 0 10px ${p.color}`
                    : `0 0 15px ${p.color}33`,
                  color: p.color,
                  transform: isOver ? 'scale(1.2)' : 'none'
                }}
              >
                {ICONS[p.iconKey]}
              </div>
              <div className="node-label" style={{ color: p.color }}>{p.name.split(' ')[0]}</div>
              <div className="node-sponsor">{p.sponsor}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
