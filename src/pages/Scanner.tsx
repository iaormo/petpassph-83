
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import QRScanner from '@/components/QRScanner';
import { mockCredentials } from '@/lib/data/mockAuth';
import { toast } from '@/hooks/use-toast';

const Scanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuth') === 'true';
    if (!isAuth) {
      navigate('/');
      return;
    }
    
    // Check if user role is medical staff
    const username = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === username);
    
    if (!user || (user.role !== 'physician' && user.role !== 'nurse' && user.role !== 'admin')) {
      // Redirect to dashboard if not medical staff
      toast({
        title: "Access Denied",
        description: "Only medical staff can access the patient scanner.",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Patient Identity Scanner</h1>
        </div>

        <div className="flex justify-center">
          <QRScanner />
        </div>

        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <h3 className="font-medium mb-3 text-blue-700">How to use:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Click "Start Scanning" to activate the camera</li>
            <li>Hold the patient's ID QR code in front of the camera</li>
            <li>Once scanned, you'll be redirected to the patient's medical record</li>
            <li>Make sure you've granted camera permissions to the application</li>
          </ul>
          <p className="mt-4 text-sm text-blue-600 font-medium">
            This system allows for quick access to patient records without manual searching
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Scanner;
