
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Patient, VaccineRecord } from "@/lib/models/types";
import { addVaccineRecord } from "@/lib/utils/patientUtils";
import AddVaccineRecordForm from "@/components/AddVaccineRecordForm";

interface VaccineRecordsTabProps {
  patient: Patient;
  setPatient?: React.Dispatch<React.SetStateAction<Patient | null>>;
  userRole: "physician" | "nurse" | "admin" | "patient";
}

const VaccineRecordsTab: React.FC<VaccineRecordsTabProps> = ({ patient, setPatient, userRole }) => {
  const isReadOnly = userRole === "patient";

  const handleAddRecord = (record: VaccineRecord) => {
    if (!patient) return;

    addVaccineRecord(patient.id, record);

    // Update the UI if setPatient is provided
    if (setPatient) {
      setPatient({ ...patient, vaccineRecords: [record, ...patient.vaccineRecords] });
    }
  };

  return (
    <div className="space-y-6">
      {!isReadOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Add Vaccine Record</CardTitle>
          </CardHeader>
          <CardContent>
            <AddVaccineRecordForm onAddRecord={handleAddRecord} />
          </CardContent>
        </Card>
      )}
      
      {patient.vaccineRecords.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">No vaccine records found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {patient.vaccineRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{record.vaccineName}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Manufacturer</p>
                      <p className="text-muted-foreground">{record.manufacturer}</p>
                    </div>
                    <div>
                      <p className="font-medium">Lot Number</p>
                      <p className="text-muted-foreground">{record.lotNumber}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium">Administered By</p>
                      <p className="text-muted-foreground">{record.administeredBy}</p>
                    </div>
                    <div>
                      <p className="font-medium">Expiration Date</p>
                      <p className="text-muted-foreground">
                        {new Date(record.expirationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="font-medium">Next Due Date</p>
                    <p className="text-muted-foreground">
                      {new Date(record.nextDueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VaccineRecordsTab;
