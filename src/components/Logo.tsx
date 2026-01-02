import { Dna } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-sm" },
    md: { icon: 28, text: "text-lg" },
    lg: { icon: 36, text: "text-2xl" },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
        <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
          <Dna size={sizes[size].icon} className="text-primary-foreground" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-semibold ${sizes[size].text} bg-gradient-to-r from-primary to-dna-accent bg-clip-text text-transparent`}>
          Genesilico
        </span>
        <span className="text-xs text-muted-foreground tracking-wider">
          cBioPortal Data Agent
        </span>
      </div>
    </div>
  );
};

export default Logo;
