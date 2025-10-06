import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Shield, Database, TrendingUp, AlertCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState({ total: 0, active: 0, expired: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Senha admin - ALTERE ISSO PARA SUA SENHA SECRETA
  const ADMIN_PASSWORD = "madara2024";

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      const interval = setInterval(loadStats, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadStats = async () => {
    const { data: signals } = await supabase
      .from('signals')
      .select('id, expires_at, status');
    
    if (signals) {
      const now = Date.now();
      const expired = signals.filter((s: any) => new Date(s.expires_at).getTime() < now).length;
      const active = signals.length - expired;
      setStats({
        total: signals.length,
        active,
        expired
      });
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "🔓 Acesso Concedido",
        description: "Bem-vindo ao Painel Administrativo",
      });
    } else {
      toast({
        title: "❌ Acesso Negado",
        description: "Senha incorreta",
        variant: "destructive"
      });
    }
  };

  const clearAllSignals = async () => {
    setIsLoading(true);
    const { error } = await supabase
      .from('signals')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      toast({
        title: "❌ Erro",
        description: "Não foi possível limpar os sinais",
        variant: "destructive"
      });
    } else {
      toast({
        title: "✅ Sucesso",
        description: "Todos os sinais foram removidos",
      });
      loadStats();
    }
    setIsLoading(false);
  };

  const clearExpiredSignals = async () => {
    setIsLoading(true);
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('signals')
      .delete()
      .lt('expires_at', now);

    if (error) {
      toast({
        title: "❌ Erro",
        description: "Não foi possível limpar sinais expirados",
        variant: "destructive"
      });
    } else {
      toast({
        title: "✅ Sucesso",
        description: "Sinais expirados foram removidos",
      });
      loadStats();
    }
    setIsLoading(false);
  };

  const clearOldSignals = async () => {
    setIsLoading(true);
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    
    const { error } = await supabase
      .from('signals')
      .delete()
      .lt('created_at', oneHourAgo.toISOString());

    if (error) {
      toast({
        title: "❌ Erro",
        description: "Não foi possível limpar sinais antigos",
        variant: "destructive"
      });
    } else {
      toast({
        title: "✅ Sucesso",
        description: "Sinais com mais de 1 hora foram removidos",
      });
      loadStats();
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-sm border-destructive/20">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 mx-auto mb-4 text-destructive animate-pulse" />
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Acesso Restrito</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Senha de Administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg">
              Entrar no Painel
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Voltar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-destructive animate-pulse" />
            <h1 className="text-4xl font-bold">Painel Administrativo</h1>
          </div>
          <p className="text-lg text-muted-foreground">Controle Total do Sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <Database className="w-10 h-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Sinais</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sinais Ativos</p>
                <p className="text-3xl font-bold">{stats.active}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-10 h-10 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Sinais Expirados</p>
                <p className="text-3xl font-bold">{stats.expired}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm border-destructive/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Trash2 className="w-6 h-6" />
            Gerenciamento de Sinais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-lg">⚠️ Limpar Todos os Sinais</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Remove TODOS os sinais do banco de dados permanentemente.
                </p>
                <Button
                  onClick={clearAllSignals}
                  disabled={isLoading}
                  variant="destructive"
                  className="w-full"
                  size="lg"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Tudo
                </Button>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-lg">🕐 Limpar Sinais Expirados</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Remove apenas os sinais que já expiraram.
                </p>
                <Button
                  onClick={clearExpiredSignals}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-yellow-500/30"
                  size="lg"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Expirados
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-lg">📅 Limpar Sinais Antigos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Remove sinais com mais de 1 hora de criação.
                </p>
                <Button
                  onClick={clearOldSignals}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-blue-500/30"
                  size="lg"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Antigos (1h+)
                </Button>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-lg">🔄 Atualizar Estatísticas</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Recarrega os dados em tempo real.
                </p>
                <Button
                  onClick={loadStats}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <Button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
                navigate('/');
              }}
              variant="outline"
              className="w-full"
            >
              🚪 Sair do Painel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
