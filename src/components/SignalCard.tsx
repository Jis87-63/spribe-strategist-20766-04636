import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SignalCardProps = {
  multiplier: number;
  confidence: number;
  timeWindow: string;
  status: "active" | "waiting" | "completed";
};

export function SignalCard({ multiplier, confidence, timeWindow, status }: SignalCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "waiting": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "active": return "ATIVO AGORA";
      case "waiting": return "AGUARDANDO";
      case "completed": return "CONCLUÍDO";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-lg">Sinal Aviator</span>
        </div>
        <Badge className={getStatusColor()}>
          {getStatusText()}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span className="text-sm">Multiplicador Alvo</span>
          </div>
          <span className="text-2xl font-bold text-primary">{multiplier}x</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Janela de Tempo</span>
          </div>
          <span className="font-semibold">{timeWindow}</span>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confiança</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
