
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ComplaintsList from '@/components/ComplaintsList';

const ViewComplaints = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top on component mount and set loaded state
  useEffect(() => {
    window.scrollTo(0, 0);
    // Slight delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container-fluid max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Denúncias da comunidade
            </h1>
            <p className="text-lg text-gray-600">
              Acompanhe os problemas reportados em Caratinga e suas atualizações
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <ComplaintsList />
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

export default ViewComplaints;
