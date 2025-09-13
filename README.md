# Marketplace Application

A full-featured marketplace application built with Next.js 15, React 19, Tailwind CSS, and Supabase.

## Features

- 📝 **Create Listings**: Upload photos and create listings with title, description, price, email, and category
- 🔍 **Browse & Search**: View all listings in a responsive grid with category filtering and search
- 📄 **Listing Details**: Dedicated pages for each listing with full information
- 💬 **Message Sellers**: Send messages to sellers with automatic email notifications
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **Email**: Nodemailer
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd react_marketplace
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Set up Database

1. In your Supabase dashboard, go to SQL Editor
2. Run the SQL from `supabase-schema.sql` to create the necessary tables
3. Go to Storage and create a new bucket called `marketplace-images`
4. Set the bucket to public in the bucket settings

### 4. Set up Email (Optional)

For email notifications to work:

1. Use Gmail with an App Password (recommended for development)
2. Or configure any SMTP service in the environment variables

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Database Schema

### Listings Table
- `id` (UUID, Primary Key)
- `title` (Text)
- `description` (Text)
- `price` (Decimal)
- `email` (Text)
- `category` (Text)
- `image_url` (Text)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Messages Table
- `id` (UUID, Primary Key)
- `listing_id` (UUID, Foreign Key)
- `buyer_email` (Text)
- `message` (Text)
- `created_at` (Timestamp)

## API Endpoints

- `POST /api/send-email` - Send email notifications to sellers

## File Structure

```
src/
├── app/
│   ├── api/send-email/route.ts
│   ├── create/page.tsx
│   ├── listing/[id]/page.tsx
│   ├── listing/[id]/not-found.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── BrowseListings.tsx
│   ├── CreateListingForm.tsx
│   ├── Header.tsx
│   ├── ListingDetail.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── Sidebar.tsx
└── lib/
    ├── data.ts
    ├── supabase.ts
    ├── supabase-server.ts
    └── utils.ts
```

## Usage

1. **Create a Listing**: Click the "+" button in the header to create a new listing
2. **Browse Listings**: Use the main page to browse all listings with search and category filters
3. **View Details**: Click on any listing to see full details
4. **Message Sellers**: Use the message form on listing detail pages to contact sellers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License