import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <User size={20} className="text-primary" />
            <h2 className="text-2xl font-bold">About Me</h2>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-10">
            <p className="text-text-secondary leading-relaxed text-lg">
              {profile.about}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
