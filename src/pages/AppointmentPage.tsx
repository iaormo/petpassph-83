
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, UserRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockCredentials } from '@/lib/data/mockAuth';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import AppointmentForm from '@/components/AppointmentForm';

// Mock appointment data
const mockAppointments = [
  {
    id: 'apt1',
    patientId: 'pet1',
    patientName: 'John Smith',
    date: '2025-05-22',
    time: '10:00 AM',
    type: 'Regular Checkup',
    doctor: 'Dr. Sarah Wilson',
    notes: 'Follow-up on previous treatment',
    status: 'confirmed'
  },
  {
    id: 'apt2',
    patientId: 'pet2',
    patientName: 'Emma Johnson',
    date: '2025-05-22',
    time: '11:30 AM',
    type: 'Consultation',
    doctor: 'Dr. Sarah Wilson',
    notes: 'Initial consultation for chronic pain',
    status: 'confirmed'
  },
  {
    id: 'apt3',
    patientId: 'pet3',
    patientName: 'Robert Brown',
    date: '2025-05-22',
    time: '2:00 PM',
    type: 'Lab Results Review',
    doctor: 'Dr. James Lee',
    notes: 'Review blood work results',
    status: 'pending'
  },
  {
    id: 'apt4',
    patientId: 'pet1',
    patientName: 'John Smith',
    date: '2025-05-24',
    time: '9:15 AM',
    type: 'Physical Therapy',
    doctor: 'Dr. Maria Rodriguez',
    notes: 'Weekly therapy session',
    status: 'confirmed'
  }
];

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [userRole, setUserRole] = useState<"doctor" | "patient">("doctor");
  const [filterDate, setFilterDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Check user role and filter appointments accordingly
    const username = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === username);

    if (user) {
      const role = user.role === "veterinary" ? "doctor" : "patient";
      setUserRole(role);
      
      if (role === "patient" && user.petsOwned) {
        // Filter appointments for patients to only show their appointments
        const patientAppts = mockAppointments.filter(apt => user.petsOwned?.includes(apt.patientId));
        setAppointments(patientAppts);
      } else {
        // Show all appointments for medical staff
        setAppointments(mockAppointments);
      }
    }
  }, []);

  const handleAddAppointment = (newAppointment) => {
    // In a real app, this would call the Go High Level API
    const updatedAppointments = [...appointments, {
      ...newAppointment,
      id: `apt${Date.now()}`,
      status: 'pending'
    }];
    
    setAppointments(updatedAppointments);
    setIsAddingAppointment(false);
    
    toast({
      title: "Appointment Created",
      description: `Appointment for ${newAppointment.patientName} on ${newAppointment.date} at ${newAppointment.time} has been scheduled.`,
    });
  };

  const handleUpdateStatus = (id, status) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    
    setAppointments(updatedAppointments);
    
    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${status}.`,
    });
  };

  // Filter appointments by date if a filter is set
  const filteredAppointments = filterDate
    ? appointments.filter(apt => apt.date === filterDate)
    : appointments;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-blue-800">
            {userRole === "doctor" ? "Appointment Schedule" : "My Appointments"}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center">
              <input
                type="date"
                className="px-3 py-2 border rounded-md mr-2"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <Button 
                variant="outline"
                onClick={() => setFilterDate('')}
                className="h-10"
              >
                Clear
              </Button>
            </div>
            
            {userRole === "doctor" && (
              <Sheet open={isAddingAppointment} onOpenChange={setIsAddingAppointment}>
                <SheetTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 h-10">
                    Schedule Appointment
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Schedule New Appointment</SheetTitle>
                    <SheetDescription>
                      Fill in the appointment details below.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <AppointmentForm onSubmit={handleAddAppointment} />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
        
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-muted-foreground">No appointments found for the selected criteria.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredAppointments.map(apt => (
              <Card key={apt.id} className={`overflow-hidden border-l-4 ${
                apt.status === 'confirmed' ? 'border-l-green-500' : 
                apt.status === 'pending' ? 'border-l-yellow-500' : 
                'border-l-gray-300'
              }`}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-5 md:w-64 bg-blue-50 flex flex-col justify-center items-center text-center">
                      <div className="text-blue-800 font-bold text-xl mb-1">{apt.time}</div>
                      <div className="text-sm text-blue-700 font-medium">{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div className="mt-3 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex-grow p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{apt.patientName}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{apt.type}</p>
                        </div>
                        {userRole === "doctor" && (
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              Confirm
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <UserRound className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{apt.doctor}</span>
                        </div>
                        {apt.notes && (
                          <div className="flex items-start col-span-1 md:col-span-2 mt-2">
                            <div className="bg-gray-50 p-2 rounded-md w-full">
                              <p className="text-muted-foreground text-xs">{apt.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AppointmentPage;
