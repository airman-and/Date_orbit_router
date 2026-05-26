import React from 'react';
import { parseMbti } from '../hooks/useDateOrbit';

export default function MbtiRadarChart({ boyfriendMbti, girlfriendMbti }) {
  const bf = parseMbti(boyfriendMbti);
  const gf = parseMbti(girlfriendMbti);

  // Helper to map 0.0-1.0 score to high/low visual scale (e.g. 0.2 to 0.8) for neat shapes
  const getScaleVal = (val) => {
    return val === 1.0 ? 85 : 25; // 85% outer, 25% inner
  };

  const bfCoords = {
    top: { x: 150, y: 150 - getScaleVal(bf.E_I) },
    right: { x: 150 + getScaleVal(bf.S_N), y: 150 },
    bottom: { x: 150, y: 150 + getScaleVal(bf.T_F) },
    left: { x: 150 - getScaleVal(bf.J_P), y: 150 }
  };

  const gfCoords = {
    top: { x: 150, y: 150 - getScaleVal(gf.E_I) },
    right: { x: 150 + getScaleVal(gf.S_N), y: 150 },
    bottom: { x: 150, y: 150 + getScaleVal(gf.T_F) },
    left: { x: 150 - getScaleVal(gf.J_P), y: 150 }
  };

  const bfPath = `${bfCoords.top.x},${bfCoords.top.y} ${bfCoords.right.x},${bfCoords.right.y} ${bfCoords.bottom.x},${bfCoords.bottom.y} ${bfCoords.left.x},${bfCoords.left.y}`;
  const gfPath = `${gfCoords.top.x},${gfCoords.top.y} ${gfCoords.right.x},${gfCoords.right.y} ${gfCoords.bottom.x},${gfCoords.bottom.y} ${gfCoords.left.x},${gfCoords.left.y}`;

  // Grid diamond paths
  const gridDiamonds = [30, 60, 90].map(r => {
    return `150,${150 - r} ${150 + r},150 150,${150 + r} ${150 - r},150`;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', margin: '20px 0' }}>
      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        📊 커플 MBTI 케미스트리 성향 궤도 융합도
      </p>
      
      <div style={{ position: 'relative', width: '300px', height: '300px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', padding: '10px' }}>
        <svg width="280" height="280" viewBox="0 0 300 300" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff758c" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#080614" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Core glow background */}
          <circle cx="150" cy="150" r="100" fill="url(#radarGlow)" />

          {/* Grid lines */}
          {gridDiamonds.map((dPath, idx) => (
            <polygon 
              key={idx} 
              points={dPath} 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.04)" 
              strokeWidth="1" 
              strokeDasharray={idx === 2 ? "none" : "3,3"} 
            />
          ))}

          {/* Axes */}
          <line x1="150" y1="50" x2="150" y2="250" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          <line x1="50" y1="150" x2="250" y2="150" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

          {/* Axis Labels */}
          <text x="150" y="38" textAnchor="middle" fill={bf.E_I === 1.0 ? "var(--accent-pink)" : "var(--text-muted)"} fontSize="10" fontWeight="bold">E (외향)</text>
          <text x="150" y="270" textAnchor="middle" fill={bf.E_I === 0.0 ? "var(--accent-blue)" : "var(--text-muted)"} fontSize="10" fontWeight="bold">I (내향)</text>
          <text x="262" y="153" textAnchor="start" fill={bf.S_N === 1.0 ? "var(--accent-pink)" : "var(--text-muted)"} fontSize="10" fontWeight="bold">S (감각)</text>
          <text x="38" y="153" textAnchor="end" fill={bf.S_N === 0.0 ? "var(--accent-blue)" : "var(--text-muted)"} fontSize="10" fontWeight="bold">N (직관)</text>

          <text x="150" y="138" textAnchor="middle" fill={bf.T_F === 1.0 ? "var(--accent-pink)" : "var(--text-muted)"} fontSize="8">T (사고)</text>
          <text x="150" y="170" textAnchor="middle" fill={bf.T_F === 0.0 ? "var(--accent-blue)" : "var(--text-muted)"} fontSize="8">F (감정)</text>
          <text x="172" y="153" textAnchor="start" fill={bf.J_P === 1.0 ? "var(--accent-pink)" : "var(--text-muted)"} fontSize="8">J (계획)</text>
          <text x="128" y="153" textAnchor="end" fill={bf.J_P === 0.0 ? "var(--accent-blue)" : "var(--text-muted)"} fontSize="8">P (즉흥)</text>

          {/* Boyfriend Polygon (Coral Rose) */}
          <polygon 
            points={bfPath} 
            fill="rgba(255, 117, 140, 0.12)" 
            stroke="var(--accent-pink)" 
            strokeWidth="2" 
            style={{ filter: 'drop-shadow(0 0 3px rgba(255,117,140,0.5))' }}
          />

          {/* Girlfriend Polygon (Sky Cyan) */}
          {boyfriendMbti !== girlfriendMbti && (
            <polygon 
              points={gfPath} 
              fill="rgba(59, 209, 255, 0.08)" 
              stroke="var(--accent-blue)" 
              strokeWidth="2" 
              style={{ filter: 'drop-shadow(0 0 3px rgba(59,209,255,0.5))' }}
            />
          )}

          {/* Boyfriend Vertices */}
          {Object.values(bfCoords).map((pt, idx) => (
            <circle key={`bf-${idx}`} cx={pt.x} cy={pt.y} r="3" fill="#ffffff" stroke="var(--accent-pink)" strokeWidth="1.5" />
          ))}

          {/* Girlfriend Vertices */}
          {boyfriendMbti !== girlfriendMbti && Object.values(gfCoords).map((pt, idx) => (
            <circle key={`gf-${idx}`} cx={pt.x} cy={pt.y} r="3" fill="#ffffff" stroke="var(--accent-blue)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      <div style={{ display: 'flex', gap: '20px', fontSize: '0.78rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-pink)' }}></span>
          <span style={{ color: 'white', fontWeight: 600 }}>👦 남자친구 ({boyfriendMbti})</span>
        </div>
        {boyfriendMbti !== girlfriendMbti && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }}></span>
            <span style={{ color: 'white', fontWeight: 600 }}>👧 여자친구 ({girlfriendMbti})</span>
          </div>
        )}
      </div>
    </div>
  );
}
