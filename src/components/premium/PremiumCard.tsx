import { motion } from "framer-motion";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const PremiumCard = ({ children, className = "", delay = 0 }: PremiumCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-premium p-8 rounded-[2rem] relative group overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
