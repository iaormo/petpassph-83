
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

const GHLSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [locationId, setLocationId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved settings
    const savedApiKey = localStorage.getItem('GHL_API_KEY');
    const savedLocationId = localStorage.getItem('GHL_LOCATION_ID');
    
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedLocationId) setLocationId(savedLocationId);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Validate API key format (basic validation)
      if (apiKey.length < 10) {
        throw new Error('API Key seems too short to be valid');
      }

      // Validate location ID
      if (!locationId) {
        throw new Error('Location ID is required');
      }

      // Save to localStorage
      localStorage.setItem('GHL_API_KEY', apiKey);
      localStorage.setItem('GHL_LOCATION_ID', locationId);

      toast({
        title: "Settings Saved",
        description: "Go High Level API settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Settings",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setIsSaving(true);
    try {
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
        'locationId': locationId
      };

      const response = await fetch('https://services.leadconnectorhq.com/locations/', {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`Connection failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      toast({
        title: "Connection Successful",
        description: `Successfully connected to Go High Level. Location name: ${data.name || 'Unknown'}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect to Go High Level API",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <CardTitle>Go High Level Integration</CardTitle>
        </div>
        <CardDescription>
          Configure the Go High Level API settings to sync patient and appointment data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Go High Level API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationId">Location ID</Label>
            <Input
              id="locationId"
              type="text"
              placeholder="Enter your Go High Level location ID"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleTestConnection}
              disabled={isSaving || !apiKey || !locationId}
            >
              Test Connection
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <span>Save Settings</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GHLSettings;
