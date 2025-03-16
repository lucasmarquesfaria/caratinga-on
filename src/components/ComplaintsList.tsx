
import { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, ComplaintType } from '@/types';
import ComplaintCard from './ComplaintCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

// Filter options
const statusFilters: { value: ComplaintStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'resolved', label: 'Resolvidos' },
];

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load complaints from localStorage on component mount
  useEffect(() => {
    try {
      const savedComplaints = localStorage.getItem('complaints');
      const parsedComplaints = savedComplaints ? JSON.parse(savedComplaints) : [];
      setComplaints(parsedComplaints);
      // Add slight delay to simulate loading from an API
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading complaints:', error);
      setIsLoading(false);
      toast.error('Erro ao carregar denúncias', {
        description: 'Tente recarregar a página.',
        icon: <AlertCircle className="h-5 w-5" />,
      });
    }
  }, []);

  // Apply filters whenever complaints, statusFilter, or searchTerm changes
  useEffect(() => {
    let result = [...complaints];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(complaint => complaint.status === statusFilter);
    }

    // Apply search filter (case insensitive)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(complaint => 
        complaint.address.toLowerCase().includes(term) ||
        complaint.description.toLowerCase().includes(term) ||
        complaint.name.toLowerCase().includes(term)
      );
    }

    setFilteredComplaints(result);
  }, [complaints, statusFilter, searchTerm]);

  // Handle status change
  const handleStatusChange = (id: string, newStatus: ComplaintStatus) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            status: newStatus, 
            updatedAt: new Date().toISOString() 
          } 
        : complaint
    );

    setComplaints(updatedComplaints);
    
    // Update localStorage
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as ComplaintStatus | 'all');
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setStatusFilter('all');
    setSearchTerm('');
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-100 rounded-lg h-48"></div>
        ))}
      </div>
    );
  }

  // Empty state
  if (complaints.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in-slow">
        <div className="mb-4">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma denúncia encontrada</h3>
        <p className="text-muted-foreground mb-6">
          Seja o primeiro a reportar um problema na cidade.
        </p>
        <Button asChild>
          <a href="/submit">Reportar um problema</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <div className="space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search" className="text-sm mb-2 block">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Buscar por endereço, descrição..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label className="text-sm mb-2 block">Status</Label>
          <RadioGroup
            value={statusFilter}
            onValueChange={handleStatusFilterChange}
            className="flex flex-wrap space-x-2"
          >
            {statusFilters.map(filter => (
              <div key={filter.value} className="flex items-center space-x-1">
                <RadioGroupItem
                  value={filter.value}
                  id={`status-${filter.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`status-${filter.value}`}
                  className="rounded-full px-3 py-1 text-sm border border-input bg-background 
                            hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary 
                            peer-data-[state=checked]:text-primary-foreground cursor-pointer transition-colors"
                >
                  {filter.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFilters}
          className="h-9 md:self-end"
        >
          Limpar filtros
        </Button>
      </div>

      {/* Results info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredComplaints.length === 0
            ? 'Nenhuma denúncia encontrada'
            : filteredComplaints.length === 1
            ? '1 denúncia encontrada'
            : `${filteredComplaints.length} denúncias encontradas`}
        </p>
      </div>

      {/* Complaints list */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center py-8 border border-dashed rounded-lg bg-muted/30">
          <p className="text-muted-foreground">
            Nenhuma denúncia corresponde aos filtros aplicados.
          </p>
          <Button variant="link" onClick={handleResetFilters}>
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredComplaints.map(complaint => (
            <ComplaintCard 
              key={complaint.id} 
              complaint={complaint} 
              onStatusChange={handleStatusChange} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
