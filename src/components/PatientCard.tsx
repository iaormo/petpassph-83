
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { Patient } from '@/lib/models/types';

interface PatientCardProps {
  patient: Patient;
  showQR?: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, showQR = true }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={patient.profileImg} 
          alt={`${patient.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">{patient.gender}</p>
          </div>
          {showQR && (
            <div className="bg-white p-1 rounded-md border">
              <QRCodeCanvas 
                value={patient.qrCode} 
                size={64} 
                includeMargin={true}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
              />
            </div>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">DOB:</span>
            <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Blood Type:</span>
            <span>{patient.bloodType || "Unknown"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height:</span>
            <span>{patient.height} cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight:</span>
            <span>{patient.weight} kg</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Button asChild className="w-full">
          <Link to={`/patient/${patient.id}`}>View Records</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
