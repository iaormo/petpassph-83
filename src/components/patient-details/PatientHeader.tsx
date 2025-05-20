
import React from 'react';
import { Button } from '@/components/ui/button';
import { Patient } from '@/lib/models/types';
import { Edit, Calendar } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PatientForm from '@/components/PatientForm';
import { updatePatient } from '@/lib/utils/patientUtils';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface PatientHeaderProps {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: "physician" | "nurse" | "admin" | "patient";
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ 
  patient, 
  setPatient, 
  isEditing, 
  setIsEditing,
  userRole
}) => {
  const handleUpdatePatient = (updatedPatient: Patient) => {
    updatePatient(updatedPatient);
    setPatient(updatedPatient);
    setIsEditing(false);
    toast({
      title: "Patient Updated",
      description: "Patient information has been updated successfully.",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
        <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
      </div>
      <div className="flex gap-2">
        {(userRole === "physician" || userRole === "admin") && (
          <Sheet open={isEditing} onOpenChange={setIsEditing}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2 items-center">
                <Edit className="h-4 w-4" />
                Edit Patient
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-lg w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Edit Patient Information</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <PatientForm patient={patient} onSubmit={handleUpdatePatient} />
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        {(userRole === "physician" || userRole === "nurse" || userRole === "admin") && (
          <Button asChild variant="default" className="flex gap-2 items-center">
            <Link to={`/appointments?patientId=${patient.id}`}>
              <Calendar className="h-4 w-4" />
              Schedule Appointment
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PatientHeader;
