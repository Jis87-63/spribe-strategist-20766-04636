import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";
import madaraImage from "@/assets/madara-rinnegan.gif";

export default function Creator() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Sobre o Criador
          </h1>
          <p className="text-muted-foreground text-lg">
            Conheça quem está por trás desta ferramenta
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-gradient-card shadow-glow">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 mb-4 shadow-glow">
              <img 
                src={madaraImage} 
                alt="Madara Uchiha - Creator Avatar" 
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">Klein Morreti</h2>
              <p className="text-muted-foreground text-lg">
                Desenvolvedor & Especialista em Estratégias de Apostas
              </p>
            </div>

            <div className="py-8 space-y-4 text-left max-w-2xl mx-auto">
              <p className="text-foreground leading-relaxed">
                Olá! Sou Klein Morreti, desenvolvedor apaixonado por tecnologia e análise de dados. 
                Criei esta ferramenta com o objetivo de ajudar apostadores a tomarem decisões mais 
                inteligentes e estratégicas.
              </p>
              <p className="text-foreground leading-relaxed">
                Com anos de experiência em desenvolvimento de sistemas e análise de padrões, 
                desenvolvi algoritmos que processam milhares de rodadas para identificar os melhores 
                momentos e estratégias de jogo.
              </p>
              <p className="text-foreground leading-relaxed">
                Esta ferramenta é o resultado de muito estudo, testes e refinamento contínuo. 
                Meu compromisso é fornecer sinais precisos e estratégias comprovadas para maximizar 
                suas chances de sucesso.
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => window.open("https://t.me/EllonMuskDev", "_blank")}
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar no Telegram
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open("https://www.megagamelive.com/affiliates/?btag=2084979", "_blank")}
                >
                  <ExternalLink className="h-5 w-5" />
                  Começar a Usar
                </Button>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Telegram: <span className="text-primary font-semibold">@EllonMuskDev</span>
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Card className="p-6 bg-muted/30 border-primary/20">
                <p className="text-sm text-muted-foreground italic">
                  "O sucesso nas apostas não vem da sorte, mas de estratégia, disciplina e ferramentas certas. 
                  Esta plataforma foi criada para ser sua aliada nessa jornada."
                </p>
                <p className="text-sm text-primary font-semibold mt-2">- Klein Morreti</p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
