import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PremiumButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}

export const PremiumButton = ({ 
  children, 
  icon: Icon, 
  variant = "primary", 
  className = "",
  onClick 
}: PremiumButtonProps) => {
  const variants = {
    primary: "bg-[#FFDE21] text-[#020617] hover:bg-[#FFE652] shadow-[0_0_20px_-5px_rgba(255,222,33,0.4)]",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
      {Icon && <Icon className="w-5 h-5" />}
      
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl -z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.button>
  );
};
