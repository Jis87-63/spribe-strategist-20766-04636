import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Calendar, Users } from "lucide-react";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  winProbability: number;
  recommendation: string;
}

export default function Football() {
  const [matches] = useState<Match[]>([
    {
      id: "1",
      homeTeam: "Costa do Sol",
      awayTeam: "Ferroviário de Maputo",
      date: "2025-10-07 15:00",
      winProbability: 78,
      recommendation: "Casa"
    },
    {
      id: "2",
      homeTeam: "Black Bulls",
      awayTeam: "Matchedje",
      date: "2025-10-07 17:30",
      winProbability: 65,
      recommendation: "Casa"
    },
    {
      id: "3",
      homeTeam: "Ferroviário de Nampula",
      awayTeam: "Liga Muçulmana",
      date: "2025-10-08 15:00",
      winProbability: 72,
      recommendation: "Casa"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 animate-fade-in space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold">Previsões de Futebol</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">
            As 3 melhores oportunidades de apostas baseadas em análise avançada
          </p>
        </div>

        <Card className="mb-6 p-6 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold text-lg">Taxa de Acerto: 84%</h3>
              <p className="text-sm text-muted-foreground">Baseado nos últimos 100 jogos analisados</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {matches.map((match, index) => (
            <Card
              key={match.id}
              className="p-6 bg-card/80 backdrop-blur-sm border-primary/20 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(match.date).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Moçambola</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1">{match.homeTeam}</div>
                    <div className="text-xs text-muted-foreground">Casa</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">VS</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1">{match.awayTeam}</div>
                    <div className="text-xs text-muted-foreground">Fora</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/30">
                    <div className="text-xs text-muted-foreground mb-1">Recomendação</div>
                    <div className="text-2xl font-bold text-primary">{match.recommendation}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-4 border border-green-500/30">
                    <div className="text-xs text-muted-foreground mb-1">Probabilidade</div>
                    <div className="text-2xl font-bold text-green-500">{match.winProbability}%</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">
                    ⚡ Análise baseada em: forma recente, histórico de confrontos e estatísticas
                  </p>
                  
                  <a
                    href="https://www.megagamelive.com/affiliates/?btag=2084979"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full" size="lg">
                      ⚽ Apostar Agora
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-gradient-card shadow-card text-center">
          <h3 className="text-xl font-bold mb-3">Quer apostar com segurança?</h3>
          <p className="text-muted-foreground mb-4">
            Cadastre-se agora e receba bônus de boas-vindas
          </p>
          <a
            href="https://www.megagamelive.com/affiliates/?btag=2084979"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">
              🎰 Criar Conta Grátis
            </Button>
          </a>
        </Card>
      </div>
    </div>
  );
}
