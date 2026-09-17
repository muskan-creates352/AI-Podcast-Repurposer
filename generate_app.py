import os
import textwrap

BASE_DIR = r"c:\Users\Rani\OneDrive\Pictures\Documents\AI-Podcast-Repurposer\ai-podcast-repurposer\src"

def write_file(path, content):
    full_path = os.path.join(BASE_DIR, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# ================= TYPES =================
write_file("types/index.ts", """
export interface User {
  name: string;
  role: string;
}

export type PodcastStatus = 'processing' | 'ready' | 'draft' | 'failed';

export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  duration: string;
  uploadDate: string;
  status: PodcastStatus;
  contentCount: number;
}

export interface TranscriptSegment {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
}

export type ContentPlatform = 'LinkedIn' | 'Instagram' | 'X' | 'YouTube';
export type ContentType = 'LinkedIn Post' | 'Instagram Caption' | 'X Post' | 'Quote' | 'Summary' | 'Show Notes' | 'Short Video Script';
export type ContentTone = 'Professional' | 'Casual' | 'Educational' | 'Engaging';

export interface GeneratedContent {
  id: string;
  podcastId: string;
  type: ContentType;
  platform: ContentPlatform;
  tone: ContentTone;
  content: string;
  createdAt: string;
}

export interface AnalyticsData {
  totalPodcasts: number;
  totalContent: number;
  processing: number;
  completed: number;
}
""")

# ================= UTILS =================
write_file("lib/utils.ts", """
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }).format(new Date(dateStr));
}
""")

# ================= MOCK DATA =================
write_file("data/mock.ts", """
import { Podcast, TranscriptSegment, GeneratedContent, AnalyticsData } from '../types';

export const mockPodcasts: Podcast[] = [
  { id: '1', title: 'The Future of AI in SaaS', description: 'Discussing AI trends in B2B software.', category: 'Technology', language: 'English', duration: '45:20', uploadDate: '2026-09-10T10:00:00Z', status: 'ready', contentCount: 5 },
  { id: '2', title: 'Building a Content Engine', description: 'How to scale your content marketing.', category: 'Marketing', language: 'English', duration: '32:15', uploadDate: '2026-09-12T14:30:00Z', status: 'ready', contentCount: 3 },
  { id: '3', title: 'Founder Mental Health', description: 'Staying sane while building a startup.', category: 'Business', language: 'English', duration: '55:00', uploadDate: '2026-09-15T09:15:00Z', status: 'processing', contentCount: 0 }
];

export const mockTranscripts: TranscriptSegment[] = [
  { id: 't1', timestamp: '00:00:00', speaker: 'Host', text: 'Welcome to the podcast. Today we are discussing AI.' },
  { id: 't2', timestamp: '00:00:15', speaker: 'Guest', text: 'Thanks for having me. AI is fundamentally changing how we build software.' },
  { id: 't3', timestamp: '00:00:45', speaker: 'Host', text: 'I completely agree. What do you see as the biggest opportunity?' },
];

export const mockGeneratedContent: GeneratedContent[] = [
  { id: 'c1', podcastId: '1', type: 'LinkedIn Post', platform: 'LinkedIn', tone: 'Professional', content: 'AI is changing the SaaS landscape faster than ever. In our latest episode, we dive deep into...\\n\\n#AI #SaaS #Tech', createdAt: '2026-09-10T11:00:00Z' },
  { id: 'c2', podcastId: '1', type: 'X Post', platform: 'X', tone: 'Engaging', content: 'Just dropped a new episode on AI in SaaS! Check out the key takeaways here \\U0001f447\\n\\n#Podcast #AI', createdAt: '2026-09-10T11:15:00Z' },
];

export const mockAnalytics: AnalyticsData = {
  totalPodcasts: 3,
  totalContent: 8,
  processing: 1,
  completed: 2
};
""")

# ================= GLOBALS.CSS =================
write_file("app/globals.css", """
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #09090b;
  --foreground: #fafafa;
  --card: #18181b;
  --card-foreground: #fafafa;
  --popover: #18181b;
  --popover-foreground: #fafafa;
  --primary: #7c3aed; /* violet-600 */
  --primary-foreground: #fafafa;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #27272a;
  --accent-foreground: #fafafa;
  --destructive: #7f1d1d;
  --destructive-foreground: #fafafa;
  --border: #27272a;
  --input: #27272a;
  --ring: #7c3aed;
  --radius: 0.5rem;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
""")

# ================= UI COMPONENTS =================
write_file("components/ui/Card.tsx", """
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 shadow", className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("font-semibold leading-none tracking-tight", className)}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}
""")

write_file("components/ui/Button.tsx", """
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-violet-600 text-white hover:bg-violet-700 shadow-sm': variant === 'default',
          'border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100': variant === 'outline',
          'hover:bg-zinc-800 hover:text-zinc-100 text-zinc-300': variant === 'ghost',
          'bg-red-900 text-red-100 hover:bg-red-900/90': variant === 'destructive',
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
""")

write_file("components/ui/Input.tsx", """
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50 text-zinc-100",
        className
      )}
      {...props}
    />
  );
}
""")

write_file("components/ui/Badge.tsx", """
import { cn } from "@/lib/utils";

export function Badge({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'success' | 'warning' | 'neutral', children: React.ReactNode }) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      {
        'border-transparent bg-violet-600 text-white': variant === 'default',
        'border-transparent bg-emerald-900/50 text-emerald-400': variant === 'success',
        'border-transparent bg-amber-900/50 text-amber-400': variant === 'warning',
        'border-zinc-700 bg-zinc-800 text-zinc-300': variant === 'neutral',
      },
      className
    )}>
      {children}
    </div>
  );
}
""")

# ================= LAYOUT =================
write_file("components/layout/Sidebar.tsx", """
import Link from 'next/link';
import { Home, Mic, Wand2, Library, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Mic, label: 'Podcasts', href: '/podcasts' },
  { icon: Wand2, label: 'Content Studio', href: '/studio' },
  { icon: Library, label: 'Content Library', href: '/library' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">AI Podcast Pro</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-md transition-colors text-sm font-medium">
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-sm font-medium text-white">M</div>
          <div>
            <p className="text-sm font-medium text-zinc-100">Muskan</p>
            <p className="text-xs text-zinc-500">Creator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
""")

write_file("components/layout/Header.tsx", """
import { Search, Bell } from 'lucide-react';
import { Input } from '../ui/Input';

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between px-6 sticky top-0 z-10 backdrop-blur-sm">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input type="search" placeholder="Search podcasts, content..." className="w-full bg-zinc-900/50 pl-9 border-zinc-800" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
""")

write_file("app/layout.tsx", """
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AI Podcast Repurposer",
  description: "Transform your podcasts into multiple content formats",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
""")

# ================= APP ROUTES =================
# DASHBOARD
write_file("app/page.tsx", """
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mic, CheckCircle2, ListMusic, PenTool } from "lucide-react";
import Link from "next/link";
import { mockAnalytics, mockPodcasts } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Welcome back, Muskan</h1>
          <p className="text-zinc-400 mt-1">Here's what's happening with your podcasts today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/podcasts/create">
            <Button className="gap-2"><Mic className="w-4 h-4" /> Upload Podcast</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Podcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockAnalytics.totalPodcasts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Content Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockAnalytics.totalContent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockAnalytics.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockAnalytics.completed}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Podcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPodcasts.map(podcast => (
                <div key={podcast.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-900/30 p-2 rounded-md">
                      <ListMusic className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-zinc-200">{podcast.title}</p>
                      <p className="text-xs text-zinc-500">{podcast.uploadDate.split('T')[0]}</p>
                    </div>
                  </div>
                  <Badge variant={podcast.status === 'ready' ? 'success' : podcast.status === 'processing' ? 'warning' : 'neutral'}>
                    {podcast.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link href="/podcasts" className="block mt-4 text-sm text-violet-400 hover:text-violet-300 text-center">View all podcasts &rarr;</Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
               <Link href="/studio">
                  <div className="p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition cursor-pointer flex flex-col items-center gap-2 text-center h-full justify-center">
                    <PenTool className="w-6 h-6 text-zinc-300" />
                    <span className="text-sm font-medium">Repurpose Content</span>
                  </div>
               </Link>
               <Link href="/library">
                  <div className="p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition cursor-pointer flex flex-col items-center gap-2 text-center h-full justify-center">
                    <CheckCircle2 className="w-6 h-6 text-zinc-300" />
                    <span className="text-sm font-medium">View Library</span>
                  </div>
               </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
""")

# PODCASTS
write_file("app/podcasts/page.tsx", """
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockPodcasts } from "@/data/mock";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export default function Podcasts() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Podcast Library</h1>
        <Link href="/podcasts/create">
          <Button className="gap-2"><Plus className="w-4 h-4" /> Add Podcast</Button>
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input type="search" placeholder="Search podcasts..." className="pl-9 bg-zinc-950 border-zinc-800" />
        </div>
      </div>

      <Card className="overflow-hidden border-zinc-800 bg-zinc-950/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 bg-zinc-900/50 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">TITLE</th>
                <th className="px-6 py-4 font-medium">CATEGORY</th>
                <th className="px-6 py-4 font-medium">UPLOAD DATE</th>
                <th className="px-6 py-4 font-medium">STATUS</th>
                <th className="px-6 py-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockPodcasts.map(podcast => (
                <tr key={podcast.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-zinc-200">{podcast.title}</div>
                    <div className="text-zinc-500 text-xs">{podcast.duration}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{podcast.category}</td>
                  <td className="px-6 py-4 text-zinc-400">{podcast.uploadDate.split('T')[0]}</td>
                  <td className="px-6 py-4">
                    <Badge variant={podcast.status === 'ready' ? 'success' : podcast.status === 'processing' ? 'warning' : 'neutral'}>
                      {podcast.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/podcasts/${podcast.id}`}>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
""")

# CREATE PODCAST
write_file("app/podcasts/create/page.tsx", """
'use client';
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UploadCloud, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePodcast() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate backend delay for MVP Viva demo
    setTimeout(() => {
      setLoading(false);
      router.push('/podcasts');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/podcasts">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">Upload New Podcast</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Podcast Title</label>
              <Input required placeholder="e.g. The Future of AI in SaaS" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Description</label>
              <textarea 
                required
                className="flex w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 min-h-[100px]" 
                placeholder="Brief summary of the episode..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Category</label>
                <select className="flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500">
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Marketing</option>
                  <option>Education</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Language</label>
                <select className="flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Audio File</label>
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-12 text-center hover:bg-zinc-800/50 transition cursor-pointer">
                <UploadCloud className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
                <p className="text-sm text-zinc-300 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-zinc-500 mt-1">MP3, WAV, M4A up to 500MB</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link href="/podcasts">
                <Button type="button" variant="ghost">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload & Process'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
""")

# PODCAST DETAILS
write_file("app/podcasts/[id]/page.tsx", """
'use client';
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, PlayCircle, Clock, Calendar, Hash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { mockPodcasts, mockTranscripts } from "@/data/mock";

export default function PodcastDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const podcast = mockPodcasts.find(p => p.id === params.id) || mockPodcasts[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/podcasts">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-zinc-100">{podcast.title}</h1>
            <Badge variant={podcast.status === 'ready' ? 'success' : 'warning'}>{podcast.status}</Badge>
          </div>
        </div>
      </div>

      <div className="flex border-b border-zinc-800">
        {['overview', 'transcript', 'generated content'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-violet-500 text-violet-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-zinc-200 mb-2">Description</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{podcast.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center justify-center p-12">
                <PlayCircle className="w-16 h-16 text-zinc-600 mb-4" />
                <div className="w-full h-2 bg-zinc-800 rounded-full mb-2"><div className="w-1/3 h-full bg-violet-600 rounded-full"></div></div>
                <div className="flex justify-between w-full text-xs text-zinc-500 font-mono"><span>00:00</span><span>{podcast.duration}</span></div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Clock className="w-4 h-4 text-zinc-500" /> {podcast.duration}
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Calendar className="w-4 h-4 text-zinc-500" /> {podcast.uploadDate.split('T')[0]}
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Hash className="w-4 h-4 text-zinc-500" /> {podcast.category}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'transcript' && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
              {mockTranscripts.map(t => (
                <div key={t.id} className="flex gap-4">
                  <div className="w-16 flex-shrink-0 text-xs font-mono text-zinc-500 pt-1">{t.timestamp}</div>
                  <div>
                    <span className="font-medium text-sm text-violet-400 mb-1 block">{t.speaker}</span>
                    <p className="text-sm text-zinc-300 leading-relaxed">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'generated content' && (
        <div className="text-center py-12">
          <p className="text-zinc-500 mb-4">View and manage content created from this podcast.</p>
          <Link href="/studio">
            <Button>Go to Content Studio</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
""")

# CONTENT STUDIO
write_file("app/studio/page.tsx", """
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Copy, Save, Check } from "lucide-react";
import { useState } from "react";
import { mockPodcasts } from "@/data/mock";

export default function Studio() {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setResult(null);
    setTimeout(() => {
      setGenerating(false);
      setResult("🚀 AI is transforming the SaaS landscape! In our latest episode of The Future of AI in SaaS, we discussed how automation is saving teams hours every week.\\n\\nKey takeaways:\\n1️⃣ Automation is not replacing jobs, it's removing drudgery.\\n2️⃣ The most successful teams embrace AI tools early.\\n\\nCheck out the full episode link in bio! #AI #SaaS #TechTrends");
    }, 2000);
  };

  const handleCopy = () => {
    if(result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Content Studio</h1>
        <p className="text-zinc-400 mt-1">Repurpose your podcasts into multi-channel content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-zinc-800 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Generation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Select Podcast</label>
              <select className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100">
                {mockPodcasts.map(p => <option key={p.id}>{p.title}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Content Type</label>
              <select className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100">
                <option>LinkedIn Post</option>
                <option>Twitter/X Thread</option>
                <option>Instagram Caption</option>
                <option>Show Notes</option>
                <option>Blog Post Draft</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Tone</label>
              <select className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100">
                <option>Professional</option>
                <option>Engaging</option>
                <option>Educational</option>
                <option>Casual</option>
              </select>
            </div>

            <Button onClick={handleGenerate} className="w-full mt-4 gap-2" disabled={generating}>
              {generating ? 'Generating...' : <><Sparkles className="w-4 h-4" /> Generate Content</>}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-zinc-800 min-h-[500px] flex flex-col">
          <CardHeader className="border-b border-zinc-800/50 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Generated Result</CardTitle>
            {result && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button size="sm" className="gap-2"><Save className="w-4 h-4" /> Save</Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 p-6 relative">
            {generating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 space-y-4">
                <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm">Analyzing transcript & generating content...</p>
              </div>
            ) : result ? (
              <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed text-sm">
                {result}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 space-y-2">
                <Sparkles className="w-12 h-12 opacity-20" />
                <p className="text-sm">Configure settings and generate content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
""")

# CONTENT LIBRARY
write_file("app/library/page.tsx", """
import { Card, CardContent } from "@/components/ui/Card";
import { mockGeneratedContent } from "@/data/mock";
import { FileText, Copy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Library() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Content Library</h1>
          <p className="text-zinc-400 mt-1">Manage all your generated content pieces.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockGeneratedContent.map(content => (
          <Card key={content.id} className="flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="neutral">{content.type}</Badge>
                <span className="text-xs text-zinc-500">{content.createdAt.split('T')[0]}</span>
              </div>
              <p className="text-sm text-zinc-300 flex-1 whitespace-pre-wrap line-clamp-4 leading-relaxed">
                {content.content}
              </p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/50">
                <Badge variant="neutral" className="bg-zinc-800/50 text-zinc-400 border-none">{content.tone}</Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Copy className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
""")

# ANALYTICS
write_file("app/analytics/page.tsx", """
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Analytics() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Analytics</h1>
        <p className="text-zinc-400 mt-1">Track your content engine performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle>Content by Platform</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-48 text-zinc-500 text-sm">
            [Chart Placeholder: Demo Data]
          </CardContent>
        </Card>
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle>Weekly Output</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-48 text-zinc-500 text-sm">
            [Chart Placeholder: Demo Data]
          </CardContent>
        </Card>
      </div>
      <div className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-lg">
        <p className="text-sm text-violet-300">
          <strong>Note for Viva MVP:</strong> Analytics visualizations will be fully integrated with real charts (e.g. Recharts) when backend database aggregation is implemented in Phase 2.
        </p>
      </div>
    </div>
  );
}
""")

# SETTINGS
write_file("app/settings/page.tsx", """
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Name</label>
            <Input defaultValue="Muskan" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <Input defaultValue="muskan@example.com" type="email" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
""")

print("Done")
