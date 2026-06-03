import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Runtime Error Capturer Overlay for debugging
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.right = '10px';
    div.style.backgroundColor = 'rgba(255, 0, 0, 0.95)';
    div.style.color = '#fff';
    div.style.padding = '15px';
    div.style.borderRadius = '8px';
    div.style.zIndex = '99999';
    div.style.maxWidth = '90vw';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '12px';
    div.style.whiteSpace = 'pre-wrap';
    div.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    div.style.border = '2px solid #fff';
    div.innerText = `🚨 [런타임 에러 감지]:\n${event.error ? event.error.stack : event.message}`;
    document.body.appendChild(div);
  });

  window.addEventListener('unhandledrejection', (event) => {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.right = '10px';
    div.style.backgroundColor = 'rgba(255, 120, 0, 0.95)';
    div.style.color = '#fff';
    div.style.padding = '15px';
    div.style.borderRadius = '8px';
    div.style.zIndex = '99999';
    div.style.maxWidth = '90vw';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '12px';
    div.style.whiteSpace = 'pre-wrap';
    div.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    div.style.border = '2px solid #fff';
    div.innerText = `🚨 [Promise 비동기 에러 감지]:\n${event.reason ? (event.reason.stack || event.reason) : 'Promise Rejected'}`;
    document.body.appendChild(div);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
