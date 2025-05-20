
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MedicalRecordsTab from './MedicalRecordsTab';
import VaccineRecordsTab from './VaccineRecordsTab';
import NotesTab from './NotesTab';
import { Patient } from '@/lib/models/types';

interface PatientDetailsTabsProps {
  patient: Patient;
  setPatient?: React.Dispatch<React.SetStateAction<Patient | null>>;
  userRole: "physician" | "nurse" | "admin" | "patient";
}

const PatientDetailsTabs: React.FC<PatientDetailsTabsProps> = ({ patient, setPatient, userRole }) => {
  return (
    <Tabs defaultValue="medical" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="medical">Medical History</TabsTrigger>
        <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="medical">
        <MedicalRecordsTab patient={patient} setPatient={setPatient} userRole={userRole} />
      </TabsContent>
      <TabsContent value="vaccines">
        <VaccineRecordsTab patient={patient} setPatient={setPatient} userRole={userRole} />
      </TabsContent>
      <TabsContent value="notes">
        <NotesTab patient={patient} setPatient={setPatient} userRole={userRole} />
      </TabsContent>
    </Tabs>
  );
};

export default PatientDetailsTabs;
