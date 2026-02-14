import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { profile, socialLinks } from '../data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Mail size={20} className="text-primary" />
            <h2 className="text-2xl font-bold">Contact</h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-10 text-center">
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              프로젝트 협업이나 채용 관련 문의는 아래 이메일로 연락해 주세요.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-medium transition-colors"
            >
              <Send size={18} />
              이메일 보내기
            </a>

            <div className="flex items-center justify-center gap-6 mt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
