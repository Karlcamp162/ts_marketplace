'use client';

import { Search, MessageCircle, Bell, Home, Play, Store, Users, Grid3X3, Plus, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left side - Logo and Search */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search results" 
                className="pl-10 w-64 bg-gray-50 border-gray-200 h-9 rounded-lg"
              />
            </div>
          </div>

          {/* Center - Main Navigation */}
          <div className="flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className={`h-12 w-16 hover:bg-gray-100 ${pathname === '/' ? 'bg-blue-50 text-blue-600' : ''}`}>
                <Home className="w-7 h-7" />
              </Button>
            </Link>
            <Link href="/watch">
              <Button variant="ghost" size="sm" className={`h-12 w-16 hover:bg-gray-100 ${pathname === '/watch' ? 'bg-blue-50 text-blue-600' : ''}`}>
                <Play className="w-7 h-7" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm" className={`h-12 w-16 hover:bg-gray-100 ${pathname === '/marketplace' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                <Store className="w-7 h-7" />
              </Button>
            </Link>
            <Link href="/groups">
              <Button variant="ghost" size="sm" className={`h-12 w-16 hover:bg-gray-100 ${pathname === '/groups' ? 'bg-blue-50 text-blue-600' : ''}`}>
                <Users className="w-7 h-7" />
              </Button>
            </Link>
            <Link href="/gaming">
              <Button variant="ghost" size="sm" className={`h-12 w-16 hover:bg-gray-100 ${pathname === '/gaming' ? 'bg-blue-50 text-blue-600' : ''}`}>
                <Gamepad2 className="w-7 h-7" />
              </Button>
            </Link>
          </div>

          {/* Right side - User controls */}
          <div className="flex items-center space-x-2">
            <Link href="/create">
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full hover:bg-gray-100">
                <Plus className="w-5 h-5 text-gray-600" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full hover:bg-gray-100">
              <Grid3X3 className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full hover:bg-gray-100">
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                20+
              </Badge>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://picsum.photos/32/32?random=user" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

      </div>
    </header>
  );
}

