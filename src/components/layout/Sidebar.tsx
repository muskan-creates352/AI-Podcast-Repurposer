'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mic, Wand2, Library, BarChart2, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Mic, label: 'Podcasts', href: '/podcasts' },
  { icon: Wand2, label: 'Content Studio', href: '/studio' },
  { icon: Library, label: 'Content Library', href: '/library' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-800/60 bg-[#000000] hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <h1 className="text-sm font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-violet-400">AI Repurposer</h1>
        </div>
      </div>

      <div className="p-4">
        <p className="px-3 text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">Workspace</p>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
                  active ? "bg-violet-500/15 text-violet-300" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                )}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-zinc-800/60">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 mb-4">
          <Settings className="w-4 h-4" /> Settings
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-zinc-900/40 border border-zinc-800/50">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-300 border border-zinc-700">M</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">Muskan</p>
            <p className="text-xs text-zinc-500 truncate">Creator Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
