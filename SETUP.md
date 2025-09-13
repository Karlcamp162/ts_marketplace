# Marketplace Setup Guide

## Quick Setup Instructions

### 1. Create Environment File

Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to **Settings** > **API**
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the entire content from `supabase-schema.sql`
3. Click **Run** to execute the SQL

### 4. Set Up Storage

1. In your Supabase dashboard, go to **Storage**
2. The SQL script should have already created the `listing-images` bucket
3. If not, create a new bucket called `listing-images` and make it public

### 5. Set Up Email (Optional)

For email notifications to work:

1. **Gmail Setup (Recommended for development):**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Google Account > Security > App passwords
   - Use your Gmail address and the app password in the environment variables

2. **Other SMTP Services:**
   - Update the `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, and `EMAIL_PASS` variables accordingly

### 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the marketplace!

## Troubleshooting

### "supabaseUrl is required" Error
- Make sure your `.env.local` file exists and contains the correct Supabase URL
- Restart the development server after adding environment variables

### Database Connection Issues
- Verify your Supabase project is active
- Check that the SQL schema was executed successfully
- Ensure RLS policies are set up correctly

### Image Upload Issues
- Verify the `listing-images` storage bucket exists and is public
- Check that the storage policies allow public access

### Email Not Working
- Verify your email credentials are correct
- For Gmail, make sure you're using an App Password, not your regular password
- Check that 2-factor authentication is enabled on your Gmail account

## Testing the Application

1. **Create a Listing:**
   - Click the "+" button in the header
   - Fill out the form and upload an image
   - Submit the listing

2. **Browse Listings:**
   - Use the search bar to find listings
   - Click on category tabs to filter
   - Click on any listing to view details

3. **Message Sellers:**
   - Go to a listing detail page
   - Fill out the message form
   - Check that the seller receives an email notification

## Database Schema

The application uses the following main tables:

- **listings**: Stores all marketplace listings
- **messages**: Stores buyer messages to sellers
- **storage.objects**: Stores uploaded images in the `listing-images` bucket

All tables have proper RLS policies for security.
