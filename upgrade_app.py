import os
import textwrap

BASE_DIR = r"c:\Users\Rani\OneDrive\Pictures\Documents\AI-Podcast-Repurposer\ai-podcast-repurposer\src"

def write_file(path, content):
    full_path = os.path.join(BASE_DIR, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# ================= 1. GLOBALS.CSS & UTILS =================

write_file("app/globals.css", """
@import "tailwindcss";

:root {
  --background: #000000;
  --foreground: #ededed;
  --card: #0a0a0a;
  --card-foreground: #ededed;
  --popover: #0a0a0a;
  --popover-foreground: #ededed;
  --primary: #ededed;
  --primary-foreground: #000000;
  --secondary: #27272a;
  --secondary-foreground: #ededed;
  --muted: #171717;
  --muted-foreground: #a1a1aa;
  --accent: #27272a;
  --accent-foreground: #ededed;
  --border: #262626;
  --input: #262626;
  --ring: #d4d4d8;
  --radius: 0.5rem;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar for a premium feel */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #404040; }

/* Subtle Animations */
@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
""")

# ================= 2. MOCK DATA =================

write_file("data/mock.ts", """
import { Podcast, TranscriptSegment, GeneratedContent, AnalyticsData } from '../types';

export const mockPodcasts: Podcast[] = [
  { id: '1', title: 'The Future of AI in SaaS', description: 'Exploring how generative AI is reshaping B2B software and workflow automation.', category: 'Technology', language: 'English', duration: '45:20', uploadDate: '2026-09-10T10:00:00Z', status: 'ready', contentCount: 12 },
  { id: '2', title: 'Building a Creator-Led Business', description: 'Strategies for leveraging audience trust to build sustainable product revenue.', category: 'Business', language: 'English', duration: '38:15', uploadDate: '2026-09-12T14:30:00Z', status: 'ready', contentCount: 8 },
  { id: '3', title: 'From Ideas to Impact', description: 'A deep dive into execution frameworks for early-stage startup founders.', category: 'Entrepreneurship', language: 'English', duration: '51:00', uploadDate: '2026-09-14T09:15:00Z', status: 'ready', contentCount: 5 },
  { id: '4', title: 'The Modern Content Economy', description: 'How algorithms are changing the way we consume and create media in 2026.', category: 'Media', language: 'English', duration: '42:10', uploadDate: '2026-09-16T11:20:00Z', status: 'processing', contentCount: 0 }
];

export const mockTranscripts: TranscriptSegment[] = [
  { id: 't1', timestamp: '00:00:00', speaker: 'Host', text: 'Welcome back to the podcast. Today, we are exploring a monumental shift in software—AI.' },
  { id: 't2', timestamp: '00:00:15', speaker: 'Guest', text: 'Thanks for having me. The reality is, if you are building SaaS today without an LLM strategy, you are already behind.' },
  { id: 't3', timestamp: '00:00:45', speaker: 'Host', text: 'I completely agree. But where do you see the highest ROI? Is it in content generation, data analysis, or internal tooling?' },
  { id: 't4', timestamp: '00:01:10', speaker: 'Guest', text: 'It is actually in workflow orchestration. Agents communicating with agents to solve complex, multi-step tasks without human intervention.' },
  { id: 't5', timestamp: '00:01:40', speaker: 'Host', text: 'Fascinating. Let us unpack that workflow orchestration concept further.' },
];

export const mockGeneratedContent: GeneratedContent[] = [
  { id: 'c1', podcastId: '1', type: 'LinkedIn Post', platform: 'LinkedIn', tone: 'Professional', content: 'Are you building SaaS without an AI strategy?\\n\\nIn our latest episode, we discussed why workflow orchestration is the true ROI driver for modern software companies.\\n\\nKey takeaway: It is no longer just about generating text; it is about agents completing multi-step tasks autonomously.\\n\\nListen to the full breakdown. 🎙️\\n\\n#SaaS #ArtificialIntelligence #Startups #FutureOfWork', createdAt: '2026-09-11T11:00:00Z' },
  { id: 'c2', podcastId: '1', type: 'X Post', platform: 'X', tone: 'Engaging', content: 'Stop using AI just to write emails.\\n\\nThe real alpha is in workflow orchestration—autonomous agents solving complex tasks.\\n\\nJust dropped a masterclass episode on this. Link below 👇\\n\\n#AI #TechTrends', createdAt: '2026-09-11T11:15:00Z' },
  { id: 'c3', podcastId: '2', type: 'Summary', platform: 'LinkedIn', tone: 'Educational', content: 'Episode Summary: Building a Creator-Led Business\\n\\nWe break down how modern creators are shifting from sponsorships to owned products, leveraging audience trust to build sustainable SaaS and e-commerce brands.', createdAt: '2026-09-13T09:00:00Z' },
];

export const mockAnalytics: AnalyticsData = {
  totalPodcasts: 8,
  totalContent: 42,
  processing: 1,
  completed: 7
};
""")

# ================= 3. UI COMPONENTS =================

write_file("components/ui/Card.tsx", """
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl border border-zinc-800/80 bg-[#0a0a0a]/80 backdrop-blur-xl text-zinc-100 shadow-sm transition-all", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("font-medium tracking-tight text-zinc-100", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-zinc-400", className)}>{children}</p>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}
""")

write_file("components/ui/Button.tsx", """
import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-zinc-100 text-zinc-900 hover:bg-white shadow-sm': variant === 'default',
            'border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-100 hover:text-zinc-50': variant === 'outline',
            'hover:bg-zinc-800/50 hover:text-zinc-100 text-zinc-400': variant === 'ghost',
            'bg-zinc-800 text-zinc-100 hover:bg-zinc-700': variant === 'secondary',
            'h-9 px-4 py-2': size === 'default',
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-10 rounded-md px-8': size === 'lg',
            'h-9 w-9': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
""")

write_file("components/ui/Badge.tsx", """
import { cn } from "@/lib/utils";

export function Badge({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'success' | 'warning' | 'neutral' | 'outline', children: React.ReactNode }) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors tracking-wide uppercase",
      {
        'bg-zinc-100 text-zinc-900': variant === 'default',
        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': variant === 'success',
        'bg-amber-500/10 text-amber-400 border border-amber-500/20': variant === 'warning',
        'bg-zinc-800 text-zinc-300': variant === 'neutral',
        'border border-zinc-700 text-zinc-400': variant === 'outline',
      },
      className
    )}>
      {children}
    </div>
  );
}
""")

# ================= 4. LAYOUT =================

write_file("components/layout/Sidebar.tsx", """
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
          <Sparkles className="w-5 h-5 text-zinc-100" />
          <h1 className="text-sm font-semibold tracking-tight text-zinc-100">AI Repurposer</h1>
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
                  active ? "bg-zinc-800/80 text-zinc-100" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
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
""")

write_file("components/layout/Header.tsx", """
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
""")

# ================= 5. APP PAGES =================

# DASHBOARD
write_file("app/page.tsx", """
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mic, CheckCircle2, ListMusic, ArrowRight, Activity, FileText, Layers, Sparkles } from "lucide-react";
import Link from "next/link";
import { mockAnalytics, mockPodcasts } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Welcome back, Muskan</h1>
          <p className="text-sm text-zinc-400 mt-1">Transform your podcasts into content that travels further.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/studio"><Button variant="outline" className="text-xs">Open Studio</Button></Link>
          <Link href="/podcasts/create"><Button className="gap-2 text-xs"><Mic className="w-3.5 h-3.5" /> Upload Podcast</Button></Link>
        </div>
      </div>

      {/* AI Pipeline Visualization */}
      <Card className="bg-gradient-to-r from-zinc-900/50 via-zinc-900/20 to-transparent border-zinc-800/60 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium flex items-center gap-2"><Sparkles className="w-4 h-4 text-zinc-400" /> AI Pipeline Status</h2>
            <Badge variant="outline">System Nominal</Badge>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            <div className="absolute left-6 right-6 top-1/2 h-px bg-zinc-800 hidden md:block -z-10" />
            
            {[
              { label: 'Upload', status: 'done' },
              { label: 'Transcription', status: 'done' },
              { label: 'AI Analysis', status: 'done' },
              { label: 'Content Gen', status: 'active' },
              { label: 'Publishing', status: 'waiting' }
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-3 bg-[#0a0a0a] p-2 rounded-lg z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-medium transition-all ${
                  step.status === 'done' ? 'bg-zinc-100 border-zinc-100 text-zinc-900' :
                  step.status === 'active' ? 'bg-zinc-900 border-zinc-500 text-zinc-100 ring-4 ring-zinc-800/50' :
                  'bg-zinc-950 border-zinc-800 text-zinc-600'
                }`}>
                  {step.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium ${step.status === 'active' ? 'text-zinc-200' : 'text-zinc-500'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Podcasts', value: mockAnalytics.totalPodcasts, icon: Mic },
          { label: 'Content Generated', value: mockAnalytics.totalContent, icon: Layers },
          { label: 'Processing', value: mockAnalytics.processing, icon: Activity },
          { label: 'Completed', value: mockAnalytics.completed, icon: CheckCircle2 }
        ].map(stat => (
          <Card key={stat.label} className="border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
                <stat.icon className="w-4 h-4 text-zinc-600" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-zinc-100">{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Content Performance */}
        <Card className="lg:col-span-2 border-zinc-800/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Generation volume over the last 7 days</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px] w-full flex items-end justify-between gap-2 px-2 pb-2 border-b border-zinc-800/50">
              {[3, 7, 4, 9, 15, 8, 12].map((val, i) => (
                <div key={i} className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all rounded-t-sm relative group" style={{ height: `${(val/15)*100}%` }}>
                   <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded text-zinc-200 transition-opacity">{val}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[10px] text-zinc-500 font-medium px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card className="border-zinc-800/60">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { title: 'Content generated', desc: 'LinkedIn Post for "Future of AI"', time: '2h ago', icon: Sparkles },
              { title: 'Transcript processed', desc: '"Creator-Led Business"', time: '5h ago', icon: FileText },
              { title: 'Podcast uploaded', desc: '"Ideas to Impact"', time: '1d ago', icon: Mic },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                {i !== 2 && <div className="absolute left-3.5 top-8 bottom-[-24px] w-px bg-zinc-800" />}
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 z-10">
                  <activity.icon className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{activity.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{activity.desc}</p>
                  <p className="text-[10px] text-zinc-600 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
""")

# PODCAST LIBRARY
write_file("app/podcasts/page.tsx", """
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockPodcasts } from "@/data/mock";
import { Plus, Search, MoreHorizontal, Filter, ListMusic, Clock, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export default function Podcasts() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Podcast Library</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your episodes and turn conversations into content.</p>
        </div>
        <Link href="/podcasts/create">
          <Button className="gap-2 text-xs"><Plus className="w-3.5 h-3.5" /> Upload Podcast</Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input type="search" placeholder="Search episodes..." className="pl-9 bg-zinc-900/30 border-zinc-800/60 h-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-9 text-xs"><Filter className="w-3.5 h-3.5" /> Status</Button>
          <Button variant="outline" size="sm" className="gap-2 h-9 text-xs"><Filter className="w-3.5 h-3.5" /> Category</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPodcasts.map(podcast => (
          <Card key={podcast.id} className="border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors group flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
                  <ListMusic className="w-5 h-5 text-zinc-400" />
                </div>
                <Badge variant={podcast.status === 'ready' ? 'success' : podcast.status === 'processing' ? 'warning' : 'neutral'}>
                  {podcast.status}
                </Badge>
              </div>
              
              <Link href={`/podcasts/${podcast.id}`} className="block group-hover:text-zinc-300 transition-colors">
                <h3 className="font-semibold text-zinc-100 text-base leading-tight mb-1">{podcast.title}</h3>
              </Link>
              <p className="text-xs text-zinc-500 mb-6 line-clamp-2">{podcast.description}</p>
              
              <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500"><Clock className="w-3.5 h-3.5" />{podcast.duration}</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500"><Sparkles className="w-3.5 h-3.5" />{podcast.contentCount}</span>
                </div>
                <Link href={`/podcasts/${podcast.id}`}>
                   <Button variant="ghost" size="sm" className="text-xs h-7 px-2">Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
""")

# DETAILS
write_file("app/podcasts/[id]/page.tsx", """
'use client';
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, PlayCircle, Clock, Calendar, Hash, Sparkles, FileText, Activity } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mockPodcasts, mockTranscripts } from "@/data/mock";

export default function PodcastDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('insights');
  const podcast = mockPodcasts.find(p => p.id === params.id) || mockPodcasts[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Link href="/podcasts">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">{podcast.title}</h1>
            <Badge variant={podcast.status === 'ready' ? 'success' : 'warning'}>{podcast.status}</Badge>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Link href="/studio">
             <Button size="sm" className="gap-2 text-xs h-8"><Sparkles className="w-3.5 h-3.5" /> Content Studio</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Player & Meta */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-zinc-800/60 bg-[#0a0a0a]">
            <CardContent className="p-5 flex flex-col items-center justify-center space-y-4">
              <div className="w-full flex justify-between items-center text-zinc-500 mb-2">
                 <span className="text-[10px] uppercase font-bold tracking-wider">Audio Source</span>
              </div>
              <button className="hover:scale-105 transition-transform">
                <PlayCircle className="w-12 h-12 text-zinc-300 hover:text-zinc-100 transition-colors" />
              </button>
              <div className="w-full space-y-1">
                 <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-zinc-300 rounded-full"></div>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>04:12</span><span>{podcast.duration}</span>
                 </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-zinc-800/60">
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Details</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{podcast.description}</p>
              </div>
              <div className="space-y-2 pt-3 border-t border-zinc-800/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Uploaded</span>
                  <span className="text-zinc-300 font-medium">{podcast.uploadDate.split('T')[0]}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5"><Hash className="w-3 h-3" /> Category</span>
                  <span className="text-zinc-300 font-medium">{podcast.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Workspace Tabs */}
        <div className="lg:col-span-3">
          <div className="flex border-b border-zinc-800/60 mb-4 overflow-x-auto hide-scrollbar">
            {['insights', 'transcript', 'generated'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'border-zinc-100 text-zinc-100' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
              >
                {tab === 'insights' ? 'AI Insights' : tab === 'generated' ? 'Generated Content' : 'Transcript'}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            {activeTab === 'insights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
                <Card className="border-zinc-800/60 bg-zinc-900/10">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-medium text-zinc-200 mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-zinc-500" /> Key Topics Detected</h3>
                    <ul className="space-y-3">
                      {['Workflow Automation (35%)', 'Creator Economy (25%)', 'AI SaaS Trends (20%)', 'Mental Health (10%)'].map((topic, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-center gap-3">
                           <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex-1"><div className="h-full bg-zinc-400 rounded-full" style={{width: topic.match(/\\d+/)?.[0] + '%'}}></div></div>
                           <span className="w-32">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-zinc-800/60 bg-zinc-900/10">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-medium text-zinc-200 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-zinc-500" /> Suggested Content Angles</h3>
                    <ul className="space-y-3">
                      <li className="text-xs text-zinc-400 bg-zinc-900/50 p-3 rounded-md border border-zinc-800/50">"Why automation isn't replacing jobs, but removing drudgery" <Badge variant="outline" className="ml-2 mt-2">LinkedIn</Badge></li>
                      <li className="text-xs text-zinc-400 bg-zinc-900/50 p-3 rounded-md border border-zinc-800/50">"3 Frameworks for execution in early startups" <Badge variant="outline" className="ml-2 mt-2">Twitter Thread</Badge></li>
                    </ul>
                    <p className="text-[10px] text-zinc-600 mt-4 text-center">*Demo data for Viva-1 presentation</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'transcript' && (
              <Card className="border-zinc-800/60 bg-zinc-900/20 animate-in">
                <CardContent className="p-0">
                  <div className="flex border-b border-zinc-800/60 p-3 bg-[#0a0a0a] rounded-t-xl items-center justify-between">
                     <span className="text-xs font-medium text-zinc-400 flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Auto-Generated Transcript</span>
                  </div>
                  <div className="space-y-1 p-5 max-h-[500px] overflow-y-auto">
                    {mockTranscripts.map((t, idx) => (
                      <div key={t.id} className={`flex gap-4 p-2 rounded-lg transition-colors ${idx === 2 ? 'bg-zinc-800/40 border border-zinc-700/50' : 'hover:bg-zinc-900/50'}`}>
                        <div className="w-14 flex-shrink-0 text-[10px] font-mono text-zinc-500 pt-1 text-right">{t.timestamp}</div>
                        <div>
                          <span className="font-medium text-xs text-zinc-100 mb-0.5 block">{t.speaker}</span>
                          <p className="text-sm text-zinc-400 leading-relaxed">{t.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'generated' && (
              <div className="text-center py-20 animate-in">
                <Sparkles className="w-8 h-8 text-zinc-600 mx-auto mb-4" />
                <p className="text-sm text-zinc-400 mb-6">Create multi-platform content from this episode.</p>
                <Link href="/studio">
                  <Button size="sm">Open Content Studio</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
""")

# STUDIO
write_file("app/studio/page.tsx", """
'use client';
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Copy, Save, Check, Settings2, Code, ArrowRight } from "lucide-react";
import { useState } from "react";
import { mockPodcasts } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";

export default function Studio() {
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setResult(null);
    setStep(1);
    
    // Simulate complex AI pipeline
    setTimeout(() => setStep(2), 800);
    setTimeout(() => setStep(3), 1600);
    setTimeout(() => setStep(4), 2400);
    setTimeout(() => {
      setGenerating(false);
      setResult("🚀 AI is fundamentally shifting the SaaS landscape.\\n\\nIn our latest episode, we broke down why workflow orchestration—agents speaking to agents—is the true alpha for 2026, not just basic text generation.\\n\\nKey takeaways:\\n1️⃣ Automation removes drudgery, it doesn't just replace jobs.\\n2️⃣ If you aren't building an LLM strategy, you're behind.\\n\\nListen to the full breakdown now. 🎙️\\n\\n#SaaS #ArtificialIntelligence #Startups #FutureOfWork");
    }, 3200);
  };

  const handleCopy = () => {
    if(result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Content Studio</h1>
        <p className="text-sm text-zinc-400 mt-1">Configure your AI pipeline to repurpose episodes into high-impact formats.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Config Panel */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="border-zinc-800/60 bg-[#0a0a0a]">
            <CardContent className="p-5 space-y-5">
              <div className="flex items-center gap-2 mb-2 pb-3 border-b border-zinc-800/50">
                 <Settings2 className="w-4 h-4 text-zinc-400" />
                 <h2 className="text-sm font-medium text-zinc-200">Pipeline Configuration</h2>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Source Material</label>
                <select className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:ring-0 outline-none transition-colors">
                  {mockPodcasts.map(p => <option key={p.id}>{p.title}</option>)}
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Content Format</label>
                <select className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:ring-0 outline-none transition-colors">
                  <option>LinkedIn Post</option>
                  <option>X (Twitter) Thread</option>
                  <option>Instagram Caption</option>
                  <option>Show Notes</option>
                  <option>Blog Post Draft</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Tone & Voice</label>
                <select className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:ring-0 outline-none transition-colors">
                  <option>Professional & Authoritative</option>
                  <option>Engaging & Conversational</option>
                  <option>Educational & Analytical</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Custom Instructions (Optional)</label>
                <textarea 
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:ring-0 outline-none transition-colors min-h-[80px] resize-none placeholder:text-zinc-600"
                  placeholder="E.g., Focus specifically on the workflow orchestration segment..."
                />
              </div>

              <Button onClick={handleGenerate} className="w-full gap-2 mt-4" disabled={generating}>
                {generating ? 'Processing Pipeline...' : <><Sparkles className="w-4 h-4" /> Run Generation</>}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-8 flex flex-col">
          <Card className="border-zinc-800/60 flex-1 flex flex-col bg-[#0a0a0a]/50">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/60 bg-[#0a0a0a]">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-medium text-zinc-300">Output Interface</span>
              </div>
              {result && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-7 text-xs gap-1.5">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button size="sm" className="h-7 text-xs gap-1.5"><Save className="w-3.5 h-3.5" /> Save to Library</Button>
                </div>
              )}
            </div>
            
            <CardContent className="flex-1 p-0 relative">
              {generating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm z-10">
                  <div className="w-full max-w-sm space-y-6 p-6">
                    <div className="flex items-center gap-3">
                       <Sparkles className="w-5 h-5 text-zinc-400 animate-pulse" />
                       <span className="text-sm font-medium text-zinc-200">Executing AI Pipeline...</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { s: 1, text: 'Analyzing transcript context...' },
                        { s: 2, text: 'Extracting key insights...' },
                        { s: 3, text: 'Applying platform heuristics...' },
                        { s: 4, text: 'Generating final copy...' }
                      ].map(item => (
                        <div key={item.s} className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${step >= item.s ? 'opacity-100 text-zinc-300' : 'opacity-30 text-zinc-600'}`}>
                           <div className={`w-1.5 h-1.5 rounded-full ${step >= item.s ? 'bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-zinc-700'}`} />
                           {item.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : result ? (
                <div className="p-8 animate-in">
                  <div className="flex gap-2 mb-6">
                     <Badge variant="outline">LinkedIn Post</Badge>
                     <Badge variant="outline">Professional</Badge>
                     <Badge variant="success" className="ml-auto">High Quality Fit</Badge>
                  </div>
                  <div className="whitespace-pre-wrap text-zinc-200 leading-relaxed text-sm font-medium max-w-2xl">
                    {result}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 space-y-3">
                  <Sparkles className="w-8 h-8 opacity-20" />
                  <p className="text-sm font-medium opacity-50">Configure pipeline parameters to generate content.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
""")

# ANALYTICS
write_file("app/analytics/page.tsx", """
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart2, TrendingUp, Layers, MousePointer2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Analytics</h1>
        <p className="text-sm text-zinc-400 mt-1">Measure the impact and velocity of your content engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Content Generated', value: '124', trend: '+14% from last month', icon: Layers },
          { label: 'Avg Content Per Episode', value: '6.2', trend: '+1.2 from last month', icon: TrendingUp },
          { label: 'Time Saved (Estimated)', value: '42 hrs', trend: 'Based on manual writing time', icon: MousePointer2 }
        ].map(stat => (
           <Card key={stat.label} className="border-zinc-800/60 bg-[#0a0a0a]">
             <CardContent className="p-5">
               <div className="flex justify-between items-start">
                 <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{stat.label}</p>
                 <stat.icon className="w-4 h-4 text-zinc-600" />
               </div>
               <div className="mt-4">
                 <span className="text-3xl font-semibold tracking-tight text-zinc-100">{stat.value}</span>
                 <p className="text-[10px] text-zinc-500 mt-1">{stat.trend}</p>
               </div>
             </CardContent>
           </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-zinc-800/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {[
              { name: 'LinkedIn', pct: 45, count: 56 },
              { name: 'X (Twitter)', pct: 30, count: 37 },
              { name: 'Instagram', pct: 15, count: 18 },
              { name: 'Blog / Web', pct: 10, count: 13 }
            ].map(plat => (
              <div key={plat.name} className="space-y-1.5">
                 <div className="flex justify-between text-xs font-medium">
                   <span className="text-zinc-300">{plat.name}</span>
                   <span className="text-zinc-500">{plat.count} items</span>
                 </div>
                 <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                   <div className="h-full bg-zinc-400 rounded-full" style={{ width: `${plat.pct}%` }} />
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800/60 bg-[#0a0a0a]">
          <CardHeader>
            <CardTitle className="text-sm">AI System Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-md bg-zinc-900/50 border border-zinc-800/50">
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Viva MVP Disclaimer:</strong> Currently, analytics are rendered using frontend presentation states and static demo data to illustrate the final product vision.<br/><br/>
                In Phase 2, this page will aggregate real telemetry from the PostgreSQL database using the FastAPI backend endpoints, displaying live charts via Recharts.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
""")

print("Done generating upgraded components")
