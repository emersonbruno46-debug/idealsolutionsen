import { motion } from "framer-motion";

export const LogoPremium = ({ variant = "full" }: { variant?: "full" | "icon" }) => {
  const logoSrc = variant === "full" ? "/logo-yellow.png" : "/logo-icon.png";
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        {variant === "icon" && (
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-[#FFDE21] blur-xl rounded-full"
          />
        )}
        <motion.img 
          src={logoSrc} 
          alt="Ideal Solutions Logo" 
          className={variant === "full" ? "h-12 w-auto relative z-10" : "h-10 w-auto relative z-10"}
          whileHover={{ scale: 1.05 }}
        />
      </div>
    </div>
  );
};
