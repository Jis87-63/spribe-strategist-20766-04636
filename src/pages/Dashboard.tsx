import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, BookOpen, User, Zap, FileText, Activity, Trophy } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const menuOptions = [
    {
      icon: Zap,
      title: "Gerador de Sinais",
      description: "Chat IA com sinais em tempo real",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      route: "/signals",
    },
    {
      icon: BookOpen,
      title: "Estratégias",
      description: "Aprenda técnicas comprovadas",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      route: "/strategies",
    },
    {
      icon: User,
      title: "Sobre o Criador",
      description: "Conheça Klein Morreti",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      route: "/creator",
    },
    {
      icon: FileText,
      title: "Termos e Condições",
      description: "Leia antes de usar",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      route: "/terms",
    },
    {
      icon: Trophy,
      title: "Previsões de Futebol",
      description: "Análises de jogos com IA",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      route: "/football",
    },
    {
      icon: Activity,
      title: "Estatísticas",
      description: "Análises e resultados",
      gradient: "from-red-500/20 to-rose-500/20",
      borderColor: "border-red-500/30",
      route: "#stats",
    },
    {
      icon: TrendingUp,
      title: "Histórico",
      description: "Seus sinais salvos",
      gradient: "from-indigo-500/20 to-violet-500/20",
      borderColor: "border-indigo-500/30",
      route: "#history",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in space-y-4">
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Escolha uma das opções abaixo para começar sua jornada de sucesso
          </p>
        </div>

        {/* CTA Card */}
        <Card className="mb-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold">Comece a Ganhar Agora</h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Cadastre-se no casino para acessar todos os nossos sinais premium
                </p>
              </div>
              <a 
                href="https://www.megagamelive.com/affiliates/?btag=2084979" 
                target="_blank" 
                rel="noopener noreferrer"
                className="min-w-[200px]"
              >
                <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover-scale">
                  Criar Conta Grátis
                </button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Menu Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {menuOptions.map((option, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${option.gradient} border ${option.borderColor} backdrop-blur-sm cursor-pointer hover-scale animate-fade-in transition-all hover:shadow-xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                if (option.route.startsWith('#')) {
                  // Future feature - show toast
                  return;
                }
                navigate(option.route);
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-background/50">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {option.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">87.5%</div>
              <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sinais Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground mt-1">+8 nas últimas 2h</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lucro Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">2.8x</div>
              <p className="text-xs text-muted-foreground mt-1">Por sinal confirmado</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
