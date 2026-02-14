export default function Footer() {
  return (
    <footer className="border-t border-dark-border py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Portfolio. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
