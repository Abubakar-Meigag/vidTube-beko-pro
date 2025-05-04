import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { VideoProvider } from './context/VideoContext.tsx';

createRoot(document.getElementById("root")!).render(
  <VideoProvider>
      <App />
  </VideoProvider>            
);
