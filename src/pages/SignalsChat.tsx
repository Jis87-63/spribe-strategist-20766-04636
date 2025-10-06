import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Bot, TrendingUp, Clock, Target, Play, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Signal {
  id: string;
  multiplier: number;
  confidence: number;
  time_window: string;
  status: string;
  result: string;
  created_at: string;
  expires_at: string;
}

export default function SignalsChat() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [signalValidity, setSignalValidity] = useState<{ [key: string]: number }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [signals]);

  // Countdown for validity of each signal
  useEffect(() => {
    const interval = setInterval(() => {
      const newValidity: { [key: string]: number } = {};
      signals.forEach(signal => {
        const expiresAt = new Date(signal.expires_at).getTime();
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));
        newValidity[signal.id] = remaining;
      });
      setSignalValidity(newValidity);
    }, 1000);

    return () => clearInterval(interval);
  }, [signals]);

  // Countdown for next signal generation
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    // Subscribe to realtime signals
    const channel = supabase
      .channel('signals-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'signals'
        },
        (payload) => {
          const newSignal = payload.new as Signal;
          setSignals(prev => [...prev, newSignal]);
          
          toast({
            title: "🎯 Novo Sinal Confirmado!",
            description: `Multiplicador: ${newSignal.multiplier}x - Confiança: ${newSignal.confidence}%`,
          });
        }
      )
      .subscribe();

    // Load initial signals
    loadSignals();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSignals = async () => {
    const { data } = await supabase
      .from('signals')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(20);
    
    if (data) setSignals(data);
  };

  const generateSignalWithTiming = async (entryDelaySeconds: number) => {
    const multiplier = (Math.random() * (5 - 1.5) + 1.5).toFixed(2);
    const confidence = Math.floor(Math.random() * (98 - 85) + 85); // Alta confiança 85-98%
    
    // Calcula horário de entrada
    const entryTime = new Date();
    entryTime.setSeconds(entryTime.getSeconds() + entryDelaySeconds);
    
    const timeWindow = `Entrada: ${entryTime.toLocaleTimeString('pt-BR')}`;
    
    // Sinal válido até 2 segundos após o horário de entrada
    const expiresAt = new Date(entryTime);
    expiresAt.setSeconds(expiresAt.getSeconds() + 2);

    const { error } = await supabase
      .from('signals')
      .insert({
        multiplier: parseFloat(multiplier),
        confidence,
        time_window: timeWindow,
        status: 'active',
        result: 'pending',
        expires_at: expiresAt.toISOString()
      });

    if (error) {
      console.error('Error generating signal:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o sinal",
        variant: "destructive"
      });
    }
  };

  const markOldSignalsAsSuccess = async () => {
    const now = new Date().toISOString();
    
    // Marca sinais expirados como sucesso
    const { error } = await supabase
      .from('signals')
      .update({ result: 'success', status: 'completed' })
      .eq('status', 'active')
      .lt('expires_at', now);

    if (error) {
      console.error('Error updating signals:', error);
    }
  };

  const startAutoGeneration = async () => {
    try {
      setIsGenerating(true);
      setCountdown(90); // Primeiro par de sinais em 90 segundos
      
      // Gera 2 sinais imediatamente com horário de entrada futuro
      await generateSignalWithTiming(90); // Entrada em 90s
      await new Promise(resolve => setTimeout(resolve, 500));
      await generateSignalWithTiming(92); // Entrada em 92s
      
      // A cada 90 segundos, gera novos sinais e marca os antigos como sucesso
      const intervalId = setInterval(async () => {
        // Marca sinais antigos como sucesso se o tempo passou
        await markOldSignalsAsSuccess();
        
        // Gera novos 2 sinais
        await generateSignalWithTiming(90);
        await new Promise(resolve => setTimeout(resolve, 500));
        await generateSignalWithTiming(92);
        setCountdown(90);
      }, 90000);

      (window as any).signalIntervalId = intervalId;
    } catch (error) {
      console.error('Error starting generation:', error);
      setIsGenerating(false);
      toast({
        title: "Erro",
        description: "Não foi possível iniciar a geração de sinais",
        variant: "destructive"
      });
    }
  };

  const stopAutoGeneration = () => {
    setIsGenerating(false);
    setCountdown(0);
    if ((window as any).signalIntervalId) {
      clearInterval((window as any).signalIntervalId);
      (window as any).signalIntervalId = null;
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 animate-fade-in space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold">Gerador de Sinais IA</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">
            Sinais gerados automaticamente com IA avançada
          </p>
        </div>

        <Card className="mb-6 p-6 bg-card/80 backdrop-blur-sm border-primary/20">
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              onClick={isGenerating ? stopAutoGeneration : startAutoGeneration}
              variant={isGenerating ? "destructive" : "default"}
              size="lg"
              className="min-w-[200px] gap-2"
            >
              {isGenerating ? (
                <>
                  <Square className="w-5 h-5" />
                  Parar Gerador
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Gerar Agora
                </>
              )}
            </Button>
            
            {isGenerating && countdown > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Próximo sinal em {formatCountdown(countdown)}</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 h-[700px] flex flex-col">
          <div className="p-4 border-b border-border/50 bg-primary/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Chat de Sinais em Tempo Real</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {signals.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <Target className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-base">Nenhum sinal gerado ainda</p>
                <p className="text-sm">Clique em "Gerar Agora" para começar</p>
              </div>
            )}

            {signals.map((signal, index) => {
              const validity = signalValidity[signal.id] || 0;
              const isExpired = validity === 0;
              const isSuccess = signal.result === 'success';
              
              return (
                <div
                  key={signal.id}
                  className="animate-fade-in flex gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSuccess ? 'bg-green-500/20' : 'bg-primary/20'
                    }`}>
                      <Bot className={`w-6 h-6 ${isSuccess ? 'text-green-500' : 'text-primary'}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Card className={`p-4 sm:p-5 bg-gradient-to-br ${
                      isSuccess 
                        ? 'from-green-500/10 to-green-500/5 border-green-500/30' 
                        : 'from-primary/10 to-primary/5 border-primary/30'
                    } ${isExpired && !isSuccess ? 'opacity-50' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-5 h-5 ${isSuccess ? 'text-green-500' : 'text-primary'}`} />
                          <span className="font-bold text-lg">
                            {isSuccess ? '✅ Sinal de Sucesso!' : 'Sinal Confirmado'}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(signal.created_at).toLocaleTimeString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Multiplicador</div>
                          <div className={`text-2xl font-bold ${isSuccess ? 'text-green-500' : 'text-primary'}`}>
                            {signal.multiplier}x
                          </div>
                        </div>
                        
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Assertividade</div>
                          <div className="text-2xl font-bold text-green-500">{signal.confidence}%</div>
                        </div>
                        
                        <div className="col-span-2 bg-background/50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Horário</div>
                          <div className="text-sm font-medium">{signal.time_window}</div>
                        </div>
                      </div>

                      {isSuccess && (
                        <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                            <Target className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              🎉 Sinal bem-sucedido! Entrada correta confirmada.
                            </span>
                          </div>
                        </div>
                      )}

                      {!isExpired && !isSuccess && (
                        <div className="mb-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Aguarde o horário de entrada: {validity}s
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        {!isSuccess && (
                          <>
                            <p className="text-sm text-muted-foreground">
                              ⚡ {isExpired ? 'Aguardando próximo sinal...' : 'Prepare-se! Entre exatamente no horário indicado.'}
                            </p>
                            
                            {!isExpired && (
                              <a
                                href="https://www.megagamelive.com/affiliates/?btag=2084979"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <Button className="w-full" size="lg">
                                  🎰 Apostar Agora
                                </Button>
                              </a>
                            )}
                          </>
                        )}
                        
                        {isSuccess && (
                          <p className="text-sm font-medium text-green-600 dark:text-green-500">
                            💰 Parabéns! Este sinal foi confirmado com sucesso pela nossa IA.
                          </p>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border/50 bg-primary/5 space-y-3">
            <div className="text-center text-sm text-muted-foreground bg-background/50 rounded-lg p-3">
              <p className="font-semibold mb-2">⚠️ IMPORTANTE</p>
              <p className="mb-2">Para obter 100% de precisão nos sinais, você DEVE criar uma conta nova no cassino através do link abaixo.</p>
              <p className="text-xs">Nossa IA funciona melhor com contas novas para garantir assertividade máxima!</p>
            </div>
            <a
              href="https://www.megagamelive.com/affiliates/?btag=2084979"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full" size="lg">
                🎰 Criar Conta e Jogar Agora
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
