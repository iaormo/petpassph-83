
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import GHLSettings from '@/components/GHLSettings';
import { mockCredentials } from '@/lib/data/mockAuth';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('isAuth') === 'true';
    if (!isAuth) {
      navigate('/');
      return;
    }
    
    // Check if user role is admin
    const username = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === username);
    
    if (!user || (user.role !== 'physician' && user.role !== 'admin')) {
      // Redirect to dashboard if not admin or physician
      toast({
        title: "Access Denied",
        description: "Only administrators and physicians can access the settings page.",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-800">System Settings</h1>
        </div>

        <div className="mb-6">
          <GHLSettings />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
