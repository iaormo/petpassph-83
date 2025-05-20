
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Patient, MedicalRecord } from "@/lib/models/types";
import { addMedicalRecord } from "@/lib/utils/patientUtils";
import AddMedicalRecordForm from "@/components/AddMedicalRecordForm";

interface MedicalRecordsTabProps {
  patient: Patient;
  setPatient?: React.Dispatch<React.SetStateAction<Patient | null>>;
  userRole: "physician" | "nurse" | "admin" | "patient";
}

const MedicalRecordsTab: React.FC<MedicalRecordsTabProps> = ({ patient, setPatient, userRole }) => {
  const isReadOnly = userRole === "patient";

  const handleAddRecord = (record: MedicalRecord) => {
    if (!patient) return;
    
    addMedicalRecord(patient.id, record);

    // Update the UI if setPatient is provided
    if (setPatient) {
      setPatient({ ...patient, medicalRecords: [record, ...patient.medicalRecords] });
    }
  };

  return (
    <div className="space-y-6">
      {!isReadOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add Medical Record</CardTitle>
          </CardHeader>
          <CardContent>
            <AddMedicalRecordForm patientId={patient.id} onAddRecord={handleAddRecord} />
          </CardContent>
        </Card>
      )}
      
      {patient.medicalRecords.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">No medical records found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {patient.medicalRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{record.description}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Treatment</p>
                      <p className="text-muted-foreground">{record.treatment}</p>
                    </div>
                    <div>
                      <p className="font-medium">Medication</p>
                      <p className="text-muted-foreground">{record.medication}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium">Physician</p>
                      <p className="text-muted-foreground">{record.physician}</p>
                    </div>
                    {record.followUp && (
                      <div>
                        <p className="font-medium">Follow Up</p>
                        <p className="text-muted-foreground">{record.followUp}</p>
                      </div>
                    )}
                  </div>
                  
                  {record.imageUrl && (
                    <div className="mt-4">
                      <p className="font-medium mb-2">Image</p>
                      <div className="border rounded-md overflow-hidden">
                        <img src={record.imageUrl} alt="Medical record" className="max-h-64 mx-auto" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsTab;
