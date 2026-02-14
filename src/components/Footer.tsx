import { useLanguage } from '../contexts/LanguageContext';
import { tr } from '../data/i18n';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} Portfolio. {tr('footer.built', lang)}
        </p>
      </div>
    </footer>
  );
}
