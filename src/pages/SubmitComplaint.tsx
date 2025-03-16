
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import ComplaintForm from '@/components/ComplaintForm';

const SubmitComplaint = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container-fluid max-w-4xl">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Reportar um problema
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Preencha o formulário abaixo para reportar um problema em Caratinga
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <div className="flex items-start p-4 mb-6 bg-amber-50 border border-amber-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">Importante</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Este sistema é colaborativo. Lembre-se de fornecer informações precisas para 
                  ajudar a resolver o problema. Quanto mais detalhes você fornecer, melhor!
                </p>
              </div>
            </div>

            <ComplaintForm />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-50 border-t border-gray-200">
        <div className="container-fluid">
          <p className="text-center text-sm text-gray-600">
            © 2023 Caratinga Conecta. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SubmitComplaint;
