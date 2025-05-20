
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/models/types';

interface PatientInfoCardProps {
  patient: Patient;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Date of Birth</dt>
            <dd className="font-medium sm:mt-1">{new Date(patient.dateOfBirth).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Gender</dt>
            <dd className="font-medium sm:mt-1">{patient.gender}</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Blood Type</dt>
            <dd className="font-medium sm:mt-1">{patient.bloodType || "Unknown"}</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Height</dt>
            <dd className="font-medium sm:mt-1">{patient.height} cm</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Weight</dt>
            <dd className="font-medium sm:mt-1">{patient.weight} kg</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Contact Phone</dt>
            <dd className="font-medium sm:mt-1">{patient.contactPhone}</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium sm:mt-1">{patient.contactEmail || "Not provided"}</dd>
          </div>
          <div className="flex justify-between sm:block">
            <dt className="text-muted-foreground">Insurance</dt>
            <dd className="font-medium sm:mt-1">{patient.insuranceProvider || "Not provided"}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
