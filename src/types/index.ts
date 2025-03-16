
export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved';

export type ComplaintType = 
  | 'water_outage' 
  | 'power_outage' 
  | 'road_damage' 
  | 'public_lighting' 
  | 'sewage_problem'
  | 'garbage_collection'
  | 'public_cleaning'
  | 'other';

export interface Complaint {
  id: string;
  name: string;
  address: string;
  type: ComplaintType;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
}
