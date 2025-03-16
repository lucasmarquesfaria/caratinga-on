
import { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Droplets, 
  Lightbulb, 
  Trash2, 
  Wrench,
  MoreHorizontal 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Complaint, ComplaintStatus, ComplaintType } from '@/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ComplaintCardProps {
  complaint: Complaint;
  onStatusChange: (id: string, status: ComplaintStatus) => void;
}

const getComplaintTypeIcon = (type: ComplaintType) => {
  switch (type) {
    case 'water_outage':
      return <Droplets className="h-5 w-5 text-blue-500" />;
    case 'power_outage':
      return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    case 'road_damage':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'garbage_collection':
      return <Trash2 className="h-5 w-5 text-emerald-500" />;
    default:
      return <Wrench className="h-5 w-5 text-gray-500" />;
  }
};

const getComplaintTypeLabel = (type: ComplaintType) => {
  switch (type) {
    case 'water_outage':
      return 'Falta de água';
    case 'power_outage':
      return 'Falta de energia';
    case 'road_damage':
      return 'Danos na via';
    case 'public_lighting':
      return 'Iluminação pública';
    case 'sewage_problem':
      return 'Problema de esgoto';
    case 'garbage_collection':
      return 'Coleta de lixo';
    case 'public_cleaning':
      return 'Limpeza pública';
    case 'other':
      return 'Outro problema';
    default:
      return 'Problema';
  }
};

const getStatusBadge = (status: ComplaintStatus) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="h-3.5 w-3.5 mr-1" />
          Pendente
        </Badge>
      );
    case 'in_progress':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Wrench className="h-3.5 w-3.5 mr-1" />
          Em andamento
        </Badge>
      );
    case 'resolved':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          Resolvido
        </Badge>
      );
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const ComplaintCard = ({ complaint, onStatusChange }: ComplaintCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { id, name, address, type, description, status, createdAt } = complaint;

  const handleStatusChange = async (newStatus: ComplaintStatus) => {
    if (status === newStatus) return;
    
    setIsUpdating(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      onStatusChange(id, newStatus);
      
      const statusMessages = {
        pending: 'Denúncia marcada como pendente',
        in_progress: 'Denúncia marcada como em andamento',
        resolved: 'Denúncia marcada como resolvida'
      };
      
      toast.success(statusMessages[newStatus]);
    } catch (error) {
      toast.error('Erro ao atualizar status');
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { 
    addSuffix: true,
    locale: ptBR
  });

  return (
    <Card className="glass-card overflow-hidden animate-fade-in hover-lift">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {getComplaintTypeIcon(type)}
            <Badge variant="secondary" className="font-normal">
              {getComplaintTypeLabel(type)}
            </Badge>
          </div>
          {getStatusBadge(status)}
        </div>
        <CardTitle className="text-xl font-semibold mt-2">{address}</CardTitle>
        <CardDescription>
          Reportado por {name} • {timeAgo}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="text-xs text-muted-foreground">
          ID: {id.substring(0, 8)}...
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" disabled={isUpdating}>
              {isUpdating ? 'Atualizando...' : (
                <>
                  Alterar status
                  <MoreHorizontal className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            <DropdownMenuItem 
              disabled={status === 'pending'}
              onClick={() => handleStatusChange('pending')}
              className="cursor-pointer"
            >
              <Clock className="h-4 w-4 mr-2 text-yellow-500" />
              Marcar como pendente
            </DropdownMenuItem>
            <DropdownMenuItem 
              disabled={status === 'in_progress'}
              onClick={() => handleStatusChange('in_progress')}
              className="cursor-pointer"
            >
              <Wrench className="h-4 w-4 mr-2 text-blue-500" />
              Marcar em andamento
            </DropdownMenuItem>
            <DropdownMenuItem 
              disabled={status === 'resolved'}
              onClick={() => handleStatusChange('resolved')}
              className="cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Marcar como resolvido
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
