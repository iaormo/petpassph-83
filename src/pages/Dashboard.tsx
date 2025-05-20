
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import DashboardStats from '@/components/DashboardStats';
import PatientCard from '@/components/PatientCard';
import { mockPatients } from '@/lib/data/mockPatients';
import { Patient } from '@/lib/models/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import PatientForm from '@/components/PatientForm';
import { toast } from '@/hooks/use-toast';
import { PlusCircle, UserRound } from 'lucide-react';
import { addPatient, getPatientsByUser } from '@/lib/utils/patientUtils';
import { mockCredentials } from '@/lib/data/mockAuth';

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [userRole, setUserRole] = useState<"physician" | "nurse" | "admin" | "patient">("physician");
  const [dashboardTitle, setDashboardTitle] = useState("Medical Dashboard");

  useEffect(() => {
    // Check user role and filter patients accordingly
    const username = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === username);

    if (user) {
      const role = user.role as "physician" | "nurse" | "admin" | "patient";
      setUserRole(role);
      
      if (role === "patient" && user.petsOwned) {
        // Filter patients to only show their records
        const patientRecords = mockPatients.filter(patient => user.petsOwned?.includes(patient.id));
        setPatients(patientRecords);
        setDashboardTitle("My Medical Dashboard");
      } else {
        // Show all patients for medical staff
        setPatients([...mockPatients]);
      }
    }
  }, []);

  const handleAddPatient = (newPatient: Patient) => {
    // Add the patient using the utility function which also updates the mockPatients array
    const addedPatient = addPatient(newPatient);
    
    // Update the local state based on user role
    if (userRole === "physician" || userRole === "nurse" || userRole === "admin") {
      setPatients([...mockPatients]); // Use the updated mockPatients array
    } else {
      // For patient, check if the new patient record is owned by them
      const username = localStorage.getItem('username');
      const user = mockCredentials.find(cred => cred.username === username);
      
      if (user && user.petsOwned && user.petsOwned.includes(addedPatient.id)) {
        setPatients(prevPatients => [addedPatient, ...prevPatients]);
      }
    }
    
    setIsAddingPatient(false);
    toast({
      title: "Patient Added",
      description: `${addedPatient.name} has been added successfully to the system.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-blue-800">{dashboardTitle}</h1>
          {(userRole === "physician" || userRole === "admin") && (
            <Sheet open={isAddingPatient} onOpenChange={setIsAddingPatient}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserRound className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Add New Patient</SheetTitle>
                  <SheetDescription>
                    Fill in the patient's information below to add them to the system.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <PatientForm onSubmit={handleAddPatient} />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        
        {(userRole === "physician" || userRole === "nurse" || userRole === "admin") && <DashboardStats />}
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">
          {userRole === "patient" ? "My Records" : "Recent Patients"}
        </h2>
        
        {patients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No patient records found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map(patient => (
              <PatientCard key={patient.id} patient={patient} showQR={userRole !== "patient"} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
