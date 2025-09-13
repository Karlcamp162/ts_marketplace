import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, CheckCircle } from 'lucide-react';

export default function SetupPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace Setup Guide</h1>
          <p className="text-gray-600">Follow these steps to configure your marketplace application with Supabase.</p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Supabase Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                Create Supabase Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>First, create a new project on Supabase:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></li>
                <li>Sign up or log in to your account</li>
                <li>Click "New Project"</li>
                <li>Choose your organization and enter a project name</li>
                <li>Set a database password (save this securely)</li>
                <li>Choose a region close to your users</li>
                <li>Click "Create new project"</li>
              </ol>
              <Button asChild>
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Go to Supabase
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                Get API Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Get your project credentials from the Supabase dashboard:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>In your project dashboard, go to <strong>Settings</strong> → <strong>API</strong></li>
                <li>Copy the <strong>Project URL</strong></li>
                <li>Copy the <strong>anon public</strong> key</li>
                <li>Copy the <strong>service_role</strong> key (keep this secret!)</li>
              </ol>
            </CardContent>
          </Card>

          {/* Step 3: Environment File */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                Create Environment File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Create a <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file in your project root with the following content:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 text-gray-300 hover:text-white"
                  onClick={() => copyToClipboard(`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password`)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <pre className="text-sm overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password`}
                </pre>
              </div>
              <p className="text-sm text-gray-600">Replace the placeholder values with your actual Supabase credentials.</p>
            </CardContent>
          </Card>

          {/* Step 4: Database Schema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                Set Up Database
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Run the database schema to create the necessary tables:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>In your Supabase dashboard, go to <strong>SQL Editor</strong></li>
                <li>Click "New Query"</li>
                <li>Copy and paste the entire content from <code className="bg-gray-100 px-2 py-1 rounded">supabase-schema.sql</code></li>
                <li>Click <strong>Run</strong> to execute the SQL</li>
              </ol>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> The SQL script will create tables, storage bucket, and security policies automatically.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Storage Bucket */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                Verify Storage Bucket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>The SQL script should have created a storage bucket automatically. Verify it exists:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>In your Supabase dashboard, go to <strong>Storage</strong></li>
                <li>Look for a bucket named <code className="bg-gray-100 px-2 py-1 rounded">listing-images</code></li>
                <li>If it doesn't exist, create it manually and make it public</li>
              </ol>
            </CardContent>
          </Card>

          {/* Step 6: Email Setup (Optional) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                Set Up Email (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>For email notifications to work, configure your email settings:</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Gmail Setup (Recommended for development):</h4>
                <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
                  <li>Enable 2-factor authentication on your Gmail account</li>
                  <li>Go to Google Account → Security → App passwords</li>
                  <li>Generate an App Password for "Mail"</li>
                  <li>Use your Gmail address and the app password in the environment variables</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Step 7: Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">✓</span>
                Test Your Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Once you've completed all steps:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Restart your development server: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
                <li>Go to <a href="/" className="text-blue-600 hover:underline">your marketplace</a></li>
                <li>The configuration warning should disappear</li>
                <li>Try creating a listing to test the functionality</li>
              </ol>
              <div className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">You're all set! Your marketplace is ready to use.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
