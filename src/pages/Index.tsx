
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-caratinga-50 to-transparent z-0"></div>
        <div className="container-fluid relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-caratinga-100 text-caratinga-700 text-sm font-medium mb-6 animate-fade-in">
              <span className="inline-block w-2 h-2 rounded-full bg-caratinga-500 mr-2"></span>
              Plataforma colaborativa para Caratinga
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Juntos por uma Caratinga melhor
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Reporte problemas urbanos como falta de água, energia, buracos nas ruas e 
              acompanhe o status das denúncias da sua comunidade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" asChild className="w-full sm:w-auto min-w-[180px] h-12 text-base">
                <Link to="/submit">Reportar um problema</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto min-w-[180px] h-12 text-base">
                <Link to="/complaints">
                  Ver denúncias
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-fluid">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Uma plataforma simples e eficiente para conectar os moradores aos problemas urbanos de Caratinga
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm animate-slide-up">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-caratinga-50 text-caratinga-600 mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reporte problemas</h3>
              <p className="text-gray-600">
                Identifique e reporte problemas urbanos da sua rua, bairro ou cidade usando o nosso formulário simples.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-caratinga-50 text-caratinga-600 mb-6">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Acompanhe o status</h3>
              <p className="text-gray-600">
                Monitore o progresso das denúncias e veja quais problemas já foram resolvidos ou estão em andamento.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-caratinga-50 text-caratinga-600 mb-6">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Colabore com atualizações</h3>
              <p className="text-gray-600">
                Atualize o status das denúncias quando perceber que um problema foi resolvido ou está em manutenção.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-caratinga-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/20"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-white/20"></div>
        </div>
        <div className="container-fluid relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
              Faça a diferença na sua cidade
            </h2>
            <p className="text-xl opacity-90 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Sua participação é fundamental para construirmos uma Caratinga melhor para todos.
            </p>
            <Button size="lg" asChild className="bg-white text-caratinga-700 hover:bg-gray-100 min-w-44 h-12 text-base animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/submit">
                Reportar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © 2023 Caratinga Conecta. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-gray-600 hover:text-caratinga-600">
                Termos de Uso
              </Link>
              <Link to="/" className="text-sm text-gray-600 hover:text-caratinga-600">
                Política de Privacidade
              </Link>
              <Link to="/" className="text-sm text-gray-600 hover:text-caratinga-600">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
