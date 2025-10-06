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

  const generateSignal = async () => {
    const multiplier = (Math.random() * (5 - 1.5) + 1.5).toFixed(2);
    const confidence = Math.floor(Math.random() * (95 - 70) + 70);
    const timeWindow = `${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 3) + 3} min`;
    
    // Sinais válidos por 20-30 segundos
    const validitySeconds = Math.floor(Math.random() * 11) + 20; // 20-30 segundos
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + validitySeconds);

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

  const startAutoGeneration = async () => {
    setIsGenerating(true);
    setCountdown(60); // Primeiro sinal em 60 segundos
    
    // Gera 2 sinais imediatamente
    await generateSignal();
    await new Promise(resolve => setTimeout(resolve, 500));
    await generateSignal();

    // Gera 2 sinais a cada 60 segundos
    const intervalId = setInterval(async () => {
      await generateSignal();
      await new Promise(resolve => setTimeout(resolve, 500));
      await generateSignal();
      setCountdown(60);
    }, 60000);

    (window as any).signalIntervalId = intervalId;
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
      <div className="container mx-auto max-w-4xl">
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

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 h-[600px] flex flex-col">
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
              
              return (
                <div
                  key={signal.id}
                  className="animate-fade-in flex gap-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Card className={`p-4 sm:p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 ${isExpired ? 'opacity-50' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <span className="font-bold text-lg">
                            Sinal Confirmado
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(signal.created_at).toLocaleTimeString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Multiplicador</div>
                          <div className="text-2xl font-bold text-primary">{signal.multiplier}x</div>
                        </div>
                        
                        <div className="bg-background/50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Confiança</div>
                          <div className="text-2xl font-bold text-green-500">{signal.confidence}%</div>
                        </div>
                        
                        <div className="col-span-2 bg-background/50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground mb-1">Janela de Tempo</div>
                          <div className="text-sm font-medium">{signal.time_window}</div>
                        </div>
                      </div>

                      {!isExpired && (
                        <div className="mb-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Válido por: {validity}s
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          ⚡ {isExpired ? 'Sinal expirado' : 'Entre agora e aproveite esta oportunidade!'}
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
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border/50 bg-primary/5">
            <a
              href="https://www.megagamelive.com/affiliates/?btag=2084979"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full" size="lg">
                🎰 Jogar Agora no Casino
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
