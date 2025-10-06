import { useState } from "react";
import { StrategyCard } from "@/components/StrategyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

const strategies = [
  {
    id: 1,
    name: "Martingale Clássico",
    description: "Dobre sua aposta após cada perda até recuperar o investimento",
    difficulty: "Fácil" as const,
    winRate: "85%",
    details: `
      **Como Funciona:**
      1. Comece com uma aposta base (ex: 100 MT)
      2. Se perder, dobre a próxima aposta (200 MT)
      3. Continue dobrando até ganhar
      4. Após ganhar, volte à aposta base
      
      **Exemplo Prático:**
      - Rodada 1: Aposta 100 MT → Perdeu
      - Rodada 2: Aposta 200 MT → Perdeu
      - Rodada 3: Aposta 400 MT → Ganhou! 
      - Lucro: 100 MT (recuperou tudo + ganho inicial)
      
      **Dicas Importantes:**
      - Tenha um bankroll de pelo menos 10x a aposta inicial
      - Defina um limite máximo de rodadas (5-7 rodadas)
      - Saia quando atingir sua meta de lucro
    `
  },
  {
    id: 2,
    name: "Anti-Martingale",
    description: "Aumente apostas quando estiver ganhando, reduza quando perder",
    difficulty: "Médio" as const,
    winRate: "78%",
    details: `
      **Como Funciona:**
      1. Comece com aposta base após perda
      2. Dobre apenas quando GANHAR
      3. Volte à base após perder
      4. Protege seu capital em sequências negativas
      
      **Exemplo Prático:**
      - Rodada 1: Aposta 100 MT → Ganhou (Lucro: +100 MT)
      - Rodada 2: Aposta 200 MT → Ganhou (Lucro: +300 MT)
      - Rodada 3: Aposta 400 MT → Perdeu (Lucro: -100 MT)
      - Rodada 4: Voltar para 100 MT
      
      **Vantagens:**
      - Aproveita sequências de vitórias
      - Minimiza perdas em sequências negativas
      - Mais sustentável a longo prazo
    `
  },
  {
    id: 3,
    name: "Fibonacci Progressivo",
    description: "Use a sequência de Fibonacci para gerenciar apostas",
    difficulty: "Avançado" as const,
    winRate: "82%",
    details: `
      **Sequência de Fibonacci:**
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
      
      **Como Funciona:**
      1. Comece com 1 unidade
      2. Após perder, avance na sequência
      3. Após ganhar, retroceda 2 posições
      4. Se estiver nas primeiras posições, volte ao início
      
      **Exemplo com Unidade de 50 MT:**
      - Rodada 1: 50 MT (1) → Perdeu
      - Rodada 2: 50 MT (1) → Perdeu  
      - Rodada 3: 100 MT (2) → Perdeu
      - Rodada 4: 150 MT (3) → Ganhou
      - Rodada 5: 50 MT (volta para 1)
      
      **Características:**
      - Progressão mais suave que Martingale
      - Recuperação gradual de perdas
      - Requer disciplina e paciência
    `
  },
  {
    id: 4,
    name: "Estratégia 1-3-2-6",
    description: "Sequência fixa de apostas para maximizar vitórias consecutivas",
    difficulty: "Fácil" as const,
    winRate: "76%",
    details: `
      **Como Funciona:**
      Siga esta sequência: 1 → 3 → 2 → 6 unidades
      
      **Exemplo com Unidade de 100 MT:**
      1. Primeira aposta: 100 MT (1 unidade)
      2. Segunda aposta: 300 MT (3 unidades) - se ganhou
      3. Terceira aposta: 200 MT (2 unidades) - se ganhou
      4. Quarta aposta: 600 MT (6 unidades) - se ganhou
      5. Se perder em qualquer etapa, volte para 100 MT
      
      **Objetivos:**
      - 4 vitórias seguidas = Lucro de 1.200 MT
      - Perda máxima controlada em cada ciclo
      - Proteção de lucros nas etapas 2 e 3
      
      **Quando Usar:**
      - Períodos de alta frequência de vitórias
      - Quando os sinais estão com alta confiança
      - Sessões curtas e focadas
    `
  },
  {
    id: 5,
    name: "Estratégia de Retirada Precoce",
    description: "Defina multiplicadores conservadores e retire rapidamente",
    difficulty: "Fácil" as const,
    winRate: "91%",
    details: `
      **Filosofia:**
      "Melhor ganhar pouco sempre do que muito raramente"
      
      **Como Funciona:**
      1. Defina multiplicador alvo: 1.5x - 2.0x
      2. Retire SEMPRE ao atingir o alvo
      3. Nunca espere multiplicadores altos
      4. Foque em consistência
      
      **Alvos Recomendados:**
      - Conservador: 1.2x - 1.5x (95% das vezes)
      - Moderado: 1.5x - 2.0x (85% das vezes)
      - Agressivo: 2.0x - 2.5x (70% das vezes)
      
      **Gestão de Banca:**
      - Aposte 2-5% do bankroll por rodada
      - Meta de lucro: 20-30% da banca por sessão
      - Stop loss: -15% da banca
      
      **Por que Funciona:**
      - Alta probabilidade de acerto
      - Lucros consistentes e frequentes
      - Risco controlado
    `
  },
  {
    id: 6,
    name: "Método de Padrões",
    description: "Identifique padrões de multiplicadores e aposte com base neles",
    difficulty: "Avançado" as const,
    winRate: "80%",
    details: `
      **Análise de Padrões:**
      
      **Padrão 1 - Compensação:**
      - 3+ rodadas baixas (< 2x) = Próxima tem alta chance de ser média/alta
      - Ação: Aposte visando 2.5x - 3.5x
      
      **Padrão 2 - Oscilação:**
      - Sequência: Alta → Baixa → Alta → Baixa
      - Ação: Antecipe o próximo movimento
      
      **Padrão 3 - Rajada:**
      - 2 multiplicadores altos seguidos
      - Ação: Próximas 2-3 rodadas podem ser baixas
      
      **Como Aplicar:**
      1. Observe 10 rodadas antes de apostar
      2. Identifique o padrão predominante
      3. Ajuste seu alvo de multiplicador
      4. Use apostas progressivas com cautela
      
      **Ferramentas:**
      - Anote os últimos 20 resultados
      - Calcule a média dos multiplicadores
      - Identifique ciclos de 5-7 rodadas
      
      **Importante:**
      - Padrões não são garantia
      - Use como complemento, não como única estratégia
      - Combine com gestão de banca rigorosa
    `
  }
];

export default function Strategies() {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);

  const selected = strategies.find(s => s.id === selectedStrategy);

  if (selected) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => setSelectedStrategy(null)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{selected.name}</h1>
                <p className="text-muted-foreground">{selected.description}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {selected.details.split('\n').map((line, i) => {
                if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                  return (
                    <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-primary">
                      {line.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (line.trim().startsWith('-')) {
                  return (
                    <li key={i} className="ml-6 mb-2 text-foreground">
                      {line.replace(/^-\s*/, '')}
                    </li>
                  );
                }
                if (line.trim()) {
                  return (
                    <p key={i} className="mb-3 text-foreground leading-relaxed">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => window.open("https://www.megagamelive.com/affiliates/?btag=2084979", "_blank")}
              >
                Testar Esta Estratégia Agora
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Estratégias Comprovadas
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha a estratégia ideal para seu perfil e maximize seus resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              {...strategy}
              onClick={() => setSelectedStrategy(strategy.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
