import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center hover-scale">
            <TrendingUp className="w-8 h-8 text-primary" />
          </Link>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1 overflow-x-auto max-w-[60vw] md:max-w-none scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent pb-2">
              <Link to="/">
                <Button
                  variant={location.pathname === "/" ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/signals">
                <Button
                  variant={location.pathname === "/signals" ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Sinais IA
                </Button>
              </Link>
              <Link to="/strategies">
                <Button
                  variant={location.pathname === "/strategies" ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Estratégias
                </Button>
              </Link>
              <Link to="/creator">
                <Button
                  variant={location.pathname === "/creator" ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Criador
                </Button>
              </Link>
              <Link to="/terms">
                <Button
                  variant={location.pathname === "/terms" ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Termos
                </Button>
              </Link>
            </nav>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="flex-shrink-0"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
