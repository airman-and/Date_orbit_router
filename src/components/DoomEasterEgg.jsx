import { useEffect, useMemo, useRef } from 'react';

const DOOM_BUNDLE_URL = `${import.meta.env.BASE_URL}vendor/doom.jsdos`;
const DOS_ZONE_FALLBACK_URL = 'https://dos.zone/doom-dec-1993/';

const createDoomSrcDoc = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://v8.js-dos.com/latest/js-dos.css" />
  <style>
    html, body, #dos { width: 100%; height: 100%; margin: 0; background: #000; overflow: hidden; }
    body::before {
      content: 'LOADING DOOM SHAREWARE...';
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      color: #d8d0b8;
      background: #050505;
      font: 700 13px/1.4 monospace;
      letter-spacing: 0.12em;
      z-index: 0;
    }
    #dos { position: relative; z-index: 1; }
  </style>
</head>
<body>
  <div id="dos"></div>
  <script src="https://v8.js-dos.com/latest/js-dos.js"></script>
  <script>
    window.addEventListener('load', function () {
      Dos(document.getElementById('dos'), {
        url: '${DOOM_BUNDLE_URL}',
        autoStart: true
      });
    });
  </script>
</body>
</html>`;

export default function DoomEasterEgg({ isOpen, onClose }) {
  const iframeRef = useRef(null);
  const srcDoc = useMemo(() => createDoomSrcDoc(), []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const focusTimer = window.setTimeout(() => {
      iframeRef.current?.focus();
    }, 700);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="doom-easter-egg" role="dialog" aria-modal="true" aria-labelledby="doom-title">
      <div className="doom-static" aria-hidden="true"></div>
      <div className="doom-shell">
        <header className="doom-header">
          <div>
            <span className="doom-kicker">SECRET MODE</span>
            <h2 id="doom-title">DOOM Shareware</h2>
          </div>
          <button type="button" className="doom-close" onClick={onClose} aria-label="DOOM 닫기">
            ESC
          </button>
        </header>

        <div className="doom-frame-wrap">
          <iframe
            ref={iframeRef}
            className="doom-frame"
            srcDoc={srcDoc}
            title="DOOM shareware running in js-dos"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups"
          />
        </div>

        <footer className="doom-footer">
          <span>D-O-O-M 입력으로 열림</span>
          <span>클릭 후 키보드 조작 · ESC로 닫기</span>
          <a href={DOS_ZONE_FALLBACK_URL} target="_blank" rel="noreferrer">새 탭에서 열기</a>
        </footer>
      </div>
    </div>
  );
}
