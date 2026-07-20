import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { verifyWhatsAppSetup } from '@/lib/whatsapp'

// Runtime sanity check: ensure the WhatsApp number and pre-filled messages
// open the correct conversation. Logs in development only if misconfigured.
verifyWhatsAppSetup()

createRoot(document.getElementById("root")!).render(<App />);
