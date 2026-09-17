import { Search, Bell, Plus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800/60 bg-[#000000]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input type="search" placeholder="Search across workspace..." className="w-full bg-zinc-900/30 pl-9 border-zinc-800/60 h-9 text-sm focus-visible:ring-zinc-700" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/podcasts/create">
          <Button variant="secondary" size="sm" className="gap-2 text-xs h-8"><Plus className="w-3.5 h-3.5" /> Upload</Button>
        </Link>
        <div className="h-4 w-px bg-zinc-800"></div>
        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
