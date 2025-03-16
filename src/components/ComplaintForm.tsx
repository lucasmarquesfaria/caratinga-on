
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ComplaintType } from '@/types';

// Mock function to generate a random ID (in a real app, this would come from the backend)
const generateId = () => Math.random().toString(36).substring(2, 15);

// Complaint type options with labels
const complaintTypes: { value: ComplaintType; label: string }[] = [
  { value: 'water_outage', label: 'Falta de água' },
  { value: 'power_outage', label: 'Falta de energia elétrica' },
  { value: 'road_damage', label: 'Danos na via pública (buracos, etc)' },
  { value: 'public_lighting', label: 'Problemas na iluminação pública' },
  { value: 'sewage_problem', label: 'Problemas de esgoto' },
  { value: 'garbage_collection', label: 'Problemas na coleta de lixo' },
  { value: 'public_cleaning', label: 'Limpeza pública' },
  { value: 'other', label: 'Outro problema' },
];

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: '' as ComplaintType | '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as ComplaintType }));
    // Clear error when user selects
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }

    if (!formData.type) {
      newErrors.type = 'Selecione o tipo de problema';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Descrição deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário.', {
        description: 'Todos os campos são obrigatórios.',
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate saving to localStorage
      const newComplaint = {
        id: generateId(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Get existing complaints from localStorage
      const existingComplaints = JSON.parse(
        localStorage.getItem('complaints') || '[]'
      );

      // Add new complaint
      localStorage.setItem(
        'complaints',
        JSON.stringify([newComplaint, ...existingComplaints])
      );

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Denúncia enviada com sucesso!', {
        description: 'Obrigado por contribuir com a cidade.',
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });

      // Reset form
      setFormData({
        name: '',
        address: '',
        type: '',
        description: '',
      });

      // Redirect to complaints page
      navigate('/complaints');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Erro ao enviar denúncia', {
        description: 'Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">
            Nome completo
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            className={`h-12 ${errors.name ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-base">
            Endereço do problema
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="Rua, número, bairro"
            value={formData.address}
            onChange={handleChange}
            className={`h-12 ${errors.address ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type" className="text-base">
          Tipo de problema
        </Label>
        <Select
          value={formData.type}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger 
            id="type" 
            className={`h-12 ${errors.type ? 'border-red-300 focus-visible:ring-red-300' : ''}`}
          >
            <SelectValue placeholder="Selecione o tipo de problema" />
          </SelectTrigger>
          <SelectContent>
            {complaintTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">
          Descrição detalhada
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descreva o problema em detalhes..."
          value={formData.description}
          onChange={handleChange}
          className={`min-h-32 resize-none ${
            errors.description ? 'border-red-300 focus-visible:ring-red-300' : ''
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="w-full md:w-auto min-w-[200px] h-12 text-base font-medium transition-all"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Denúncia'}
      </Button>
    </form>
  );
};

export default ComplaintForm;
