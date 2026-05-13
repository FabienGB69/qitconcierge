import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © Qit Concierge — Conciergerie courte durée en Drôme-Ardèche.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/cgv" className="hover:text-white transition-colors">
              Conditions générales de vente
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="hover:text-white transition-colors"
            >
              Gérer mes cookies
            </button>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          Site réalisé avec ❤️ par{" "}
          <a
            href="https://pixeloria.fr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('pixeloria_click', { location: 'footer' })}
            aria-label="Pixeloria — création de sites web (ouvre dans un nouvel onglet)"
            className="inline-block font-medium text-qit-coral hover:underline rounded-sm px-1 py-1 -mx-1 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qit-coral focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Pixeloria
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
