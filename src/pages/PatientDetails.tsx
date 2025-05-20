
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Patient } from '@/lib/models/types';
import { getPatientById } from '@/lib/utils/patientUtils';
import PatientHeader from '@/components/patient-details/PatientHeader';
import PatientInfoCard from '@/components/patient-details/PatientInfoCard';
import QRCodeCard from '@/components/patient-details/QRCodeCard';
import PatientDetailsTabs from '@/components/patient-details/PatientDetailsTabs';
import { mockCredentials } from '@/lib/data/mockAuth';
import { toast } from '@/hooks/use-toast';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState<"physician" | "nurse" | "admin" | "patient">("physician");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuth') === 'true';
    if (!isAuth) {
      navigate('/');
      return;
    }

    // Get user role from localStorage
    const currentUsername = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === currentUsername);
    
    if (user) {
      setUserRole(user.role as "physician" | "nurse" | "admin" | "patient");
      
      // If user is patient, check if they own this record
      if (user.role === "patient") {
        if (user.petsOwned && id && user.petsOwned.includes(id)) {
          setAuthorized(true);
        } else {
          toast({
            title: "Access Denied",
            description: "You do not have permission to view this patient record.",
            variant: "destructive"
          });
          navigate('/dashboard');
          return;
        }
      } else {
        // Medical staff has access to all patients
        setAuthorized(true);
      }
    }

    // Get patient data
    if (id) {
      const patientData = getPatientById(id);
      if (patientData) {
        setPatient(patientData);
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading || !patient) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse-gentle">Loading patient information...</div>
        </div>
      </Layout>
    );
  }

  if (!authorized) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-red-500">You do not have permission to view this patient record.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Patient header with name, edit button, etc */}
        <PatientHeader 
          patient={patient} 
          setPatient={setPatient} 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          userRole={userRole}
        />

        {/* Patient information cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PatientInfoCard patient={patient} />
          <QRCodeCard qrCode={patient.qrCode} patientName={patient.name} />
        </div>

        {/* Tabs for medical history, vaccines, notes */}
        <PatientDetailsTabs patient={patient} setPatient={setPatient} userRole={userRole} />
      </div>
    </Layout>
  );
};

export default PatientDetails;
