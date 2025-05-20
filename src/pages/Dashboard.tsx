
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import DashboardStats from '@/components/DashboardStats';
import PetCard from '@/components/PetCard';
import { mockPets } from '@/lib/data/mockPets';
import { Pet } from '@/lib/models/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import PetForm from '@/components/PetForm';
import { toast } from '@/hooks/use-toast';
import { PlusCircle, UserRound } from 'lucide-react';
import { addPet, getPetsByOwner } from '@/lib/utils/petUtils';
import { mockCredentials } from '@/lib/data/mockAuth';

const Dashboard = () => {
  const [patients, setPatients] = useState<Pet[]>([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [userRole, setUserRole] = useState<"doctor" | "patient">("doctor");
  const [dashboardTitle, setDashboardTitle] = useState("Medical Dashboard");

  useEffect(() => {
    // Check user role and filter patients accordingly
    const username = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === username);

    if (user) {
      const role = user.role === "veterinary" ? "doctor" : "patient";
      setUserRole(role);
      
      if (role === "patient" && user.petsOwned) {
        // Filter patients to only show their records
        const patientRecords = mockPets.filter(pet => user.petsOwned?.includes(pet.id));
        setPatients(patientRecords);
        setDashboardTitle("My Medical Dashboard");
      } else {
        // Show all patients for medical staff
        setPatients([...mockPets]);
      }
    }
  }, []);

  const handleAddPatient = (newPatient: Pet) => {
    // Add the patient using the utility function which also updates the mockPets array
    const addedPatient = addPet(newPatient);
    
    // Update the local state based on user role
    if (userRole === "doctor") {
      setPatients([...mockPets]); // Use the updated mockPets array
    } else {
      // For patient, check if the new pet is owned by them
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
          {userRole === "doctor" && (
            <Sheet open={isAddingPatient} onOpenChange={setIsAddingPatient}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
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
                  <PetForm onSubmit={handleAddPatient} />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        
        {userRole === "doctor" && <DashboardStats />}
        
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
              <PetCard key={patient.id} pet={patient} showQR={userRole === "doctor"} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
