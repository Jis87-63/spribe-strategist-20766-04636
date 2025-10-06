import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

type StrategyCardProps = {
  name: string;
  description: string;
  difficulty: "Fácil" | "Médio" | "Avançado";
  winRate: string;
  onClick: () => void;
};

export function StrategyCard({ name, description, difficulty, winRate, onClick }: StrategyCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Fácil": return "bg-success text-success-foreground";
      case "Médio": return "bg-warning text-warning-foreground";
      case "Avançado": return "bg-destructive text-destructive-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge className={getDifficultyColor()}>
            {difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Taxa de Acerto</p>
            <p className="text-2xl font-bold text-primary">{winRate}</p>
          </div>
          <Button onClick={onClick} className="gap-2">
            Ver Detalhes
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
