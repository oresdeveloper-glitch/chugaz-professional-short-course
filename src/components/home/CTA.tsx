"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, GraduationCap } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4">
            Take the Next Step
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Your future starts today. Whether you&apos;re ready to enroll or want to
            learn more, we&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-white/10 backdrop-blur-sm rounded-[20px] p-8 border border-white/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 right-0 h-1 gradient-gold rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <GraduationCap className="w-12 h-12 text-gold mb-5" />
            <h3 className="text-2xl font-heading font-bold text-white mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Enroll now and take the first step toward a brighter future with
              industry-recognized certification.
            </p>
            <Link
              href="/register"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-[20px] gradient-gold text-primary font-button font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
            >
              Register Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative bg-white/10 backdrop-blur-sm rounded-[20px] p-8 border border-white/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 right-0 h-1 gradient-gold rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Phone className="w-12 h-12 text-gold mb-5" />
            <h3 className="text-2xl font-heading font-bold text-white mb-3">
              Want to Learn More?
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Have questions about our courses, fees, or schedules? Our team is
              ready to assist you.
            </p>
            <Link
              href="/contact"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-[20px] border-2 border-white/30 text-white font-button font-bold text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
