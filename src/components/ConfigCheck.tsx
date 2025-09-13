'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export default function ConfigCheck() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch('/api/config-check');
        const data = await response.json();
        setIsConfigured(data.configured);
      } catch (error) {
        setIsConfigured(false);
      } finally {
        setChecking(false);
      }
    };

    checkConfig();
  }, []);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Checking configuration...</div>
      </div>
    );
  }

  if (isConfigured) {
    return null; // Don't show anything if configured
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            Configuration Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-orange-700">
            The marketplace application needs to be configured with Supabase to function properly.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-800">Setup Steps:</h4>
            <ol className="list-decimal list-inside space-y-1 text-orange-700">
              <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a></li>
              <li>Create a <code className="bg-orange-100 px-1 rounded">.env.local</code> file with your Supabase credentials</li>
              <li>Run the SQL schema from <code className="bg-orange-100 px-1 rounded">supabase-schema.sql</code></li>
              <li>Create a storage bucket called <code className="bg-orange-100 px-1 rounded">listing-images</code></li>
            </ol>
          </div>

          <div className="flex space-x-2">
            <Button asChild variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to Supabase
              </a>
            </Button>
            <Button asChild variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
              <a href="/setup" target="_blank" rel="noopener noreferrer">
                View Setup Guide
              </a>
            </Button>
          </div>

          <div className="text-sm text-orange-600">
            <p>Once configured, the application will automatically detect the setup and hide this message.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
