import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, AlertTriangle, FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Termos e Condições
          </h1>
          <p className="text-muted-foreground text-lg">
            Leia atentamente antes de usar nossa ferramenta
          </p>
        </div>

        <div className="space-y-6">
          {/* Requirement Card */}
          <Card className="p-8 bg-gradient-primary text-white border-0 shadow-glow">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Requisito Obrigatório</h2>
                <p className="text-white/90 mb-4 text-lg">
                  Para utilizar esta ferramenta, você DEVE criar uma conta no cassino parceiro 
                  através do nosso link oficial. Este é um requisito essencial para acessar os sinais 
                  e estratégias.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                  onClick={() => window.open("https://www.megagamelive.com/affiliates/?btag=2084979", "_blank")}
                >
                  Criar Conta Agora
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Terms Content */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. Sobre a Ferramenta</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p>
                    Esta ferramenta foi desenvolvida para fornecer sinais e estratégias para o jogo Aviator 
                    da Spribe Gaming e apostas esportivas. Os sinais são gerados através de análise de dados 
                    e algoritmos proprietários de Inteligência Artificial avançada.
                  </p>
                  <p className="font-semibold text-green-600 dark:text-green-500">
                    ✅ Nossa IA possui alta assertividade quando utilizada corretamente! Para obter os melhores 
                    resultados, é ESSENCIAL criar uma conta NOVA no cassino parceiro através do nosso link oficial.
                  </p>
                  <p>
                    A ferramenta é gratuita para uso, mas requer que você tenha uma conta ativa no cassino 
                    parceiro para que possa aplicar as estratégias sugeridas com precisão máxima.
                  </p>
                  <p className="text-sm italic text-muted-foreground">
                    Importante: A assertividade da ferramenta é otimizada para contas novas criadas através 
                    do nosso link. Contas antigas ou de outros links podem apresentar resultados variados.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  <h2 className="text-2xl font-bold">2. Requisitos e Precisão</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p className="font-semibold text-primary">
                    🎯 Para máxima precisão e assertividade:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li className="font-semibold">
                      Crie uma conta NOVA através do nosso link oficial do cassino parceiro
                    </li>
                    <li>
                      Siga EXATAMENTE os horários de entrada indicados nos sinais (não entre antes ou depois)
                    </li>
                    <li>
                      Use os multiplicadores sugeridos pela IA
                    </li>
                    <li>
                      Aguarde a confirmação de sucesso antes de considerar o próximo sinal
                    </li>
                  </ul>
                  <p className="font-semibold text-warning mt-4">
                    ⚠️ AVISO: Embora nossa IA tenha alta assertividade, apostas sempre envolvem riscos.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Você é totalmente responsável por suas decisões de apostas</li>
                    <li>Nunca aposte dinheiro que você não pode perder</li>
                    <li>Defina limites de gastos e respeite-os rigorosamente</li>
                    <li>Apostas podem causar dependência - jogue com responsabilidade</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">3. Uso da Ferramenta</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p>Ao usar esta ferramenta, você concorda que:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>É maior de 18 anos e tem capacidade legal para apostar</li>
                    <li>Está ciente dos riscos envolvidos em apostas</li>
                    <li>Utilizará a ferramenta de forma ética e responsável</li>
                    <li>Não responsabilizará os criadores por perdas financeiras</li>
                    <li>Seguirá todas as leis locais relacionadas a apostas online</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">4. Privacidade e Cookies</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p>
                    Esta ferramenta utiliza cookies apenas para armazenar suas preferências de uso 
                    (como tema claro/escuro). Não coletamos dados pessoais sensíveis.
                  </p>
                  <p>
                    Não há necessidade de cadastro ou login. Seus dados de navegação permanecem locais 
                    em seu dispositivo.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  <h2 className="text-2xl font-bold">5. Limitação de Responsabilidade</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p>
                    Os criadores e desenvolvedores desta ferramenta não se responsabilizam por:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Perdas financeiras decorrentes do uso da ferramenta</li>
                    <li>Decisões de apostas tomadas com base nos sinais fornecidos</li>
                    <li>Problemas técnicos ou indisponibilidade temporária do serviço</li>
                    <li>Alterações nas regras ou funcionamento do cassino parceiro</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-success" />
                  <h2 className="text-2xl font-bold">6. Jogo Responsável</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p className="font-semibold text-success">
                    Recomendações para jogar com responsabilidade:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Estabeleça um orçamento fixo para apostas e não ultrapasse</li>
                    <li>Defina limites de tempo para suas sessões de jogo</li>
                    <li>Não tente recuperar perdas apostando mais</li>
                    <li>Faça pausas regulares durante o jogo</li>
                    <li>Se sentir que está perdendo o controle, procure ajuda profissional</li>
                    <li>Use as estratégias como guia, não como regra absoluta</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">7. Atualizações dos Termos</h2>
                </div>
                <div className="space-y-3 text-foreground">
                  <p>
                    Estes termos podem ser atualizados periodicamente para refletir mudanças na 
                    ferramenta ou requisitos legais. Recomendamos revisar esta página regularmente.
                  </p>
                  <p>
                    Última atualização: Janeiro de 2025
                  </p>
                </div>
              </section>
            </div>
          </Card>

          {/* CTA Card */}
          <Card className="p-8 bg-gradient-card shadow-card text-center">
            <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-muted-foreground mb-6">
              Crie sua conta e tenha acesso completo aos sinais e estratégias
            </p>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => window.open("https://www.megagamelive.com/affiliates/?btag=2084979", "_blank")}
            >
              Criar Conta Grátis
              <ExternalLink className="h-5 w-5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
