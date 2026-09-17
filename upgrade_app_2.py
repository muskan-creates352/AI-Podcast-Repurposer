import os
import textwrap

BASE_DIR = r"c:\Users\Rani\OneDrive\Pictures\Documents\AI-Podcast-Repurposer\ai-podcast-repurposer\src"

def write_file(path, content):
    full_path = os.path.join(BASE_DIR, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(textwrap.dedent(content).strip() + "\n")

# LIBRARY
write_file("app/library/page.tsx", """
import { Card, CardContent } from "@/components/ui/Card";
import { mockGeneratedContent } from "@/data/mock";
import { FileText, Copy, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Library() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Content Library</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage and export all your AI-generated assets.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="text-xs">Export All</Button>
        </div>
      </div>

      <div className="flex border-b border-zinc-800/60 mb-6">
        {['All Content', 'Saved', 'Drafts'].map((tab, i) => (
           <div key={tab} className={`px-4 py-2.5 text-xs font-medium border-b-2 cursor-pointer ${i === 0 ? 'border-zinc-100 text-zinc-100' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
             {tab}
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockGeneratedContent.map(content => (
          <Card key={content.id} className="flex flex-col group border-zinc-800/60 bg-[#0a0a0a] hover:border-zinc-700/80 transition-all">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="bg-zinc-900/50">{content.type}</Badge>
                <span className="text-[10px] font-mono text-zinc-600">{content.createdAt.split('T')[0]}</span>
              </div>
              <p className="text-xs text-zinc-300 flex-1 whitespace-pre-wrap line-clamp-5 leading-relaxed mb-4">
                {content.content}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                <Badge variant="neutral" className="bg-zinc-900 text-zinc-500 border-none">{content.tone}</Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ExternalLink className="w-3.5 h-3.5" /></Button>
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

# SETTINGS
write_file("app/settings/page.tsx", """
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Bell, Palette, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">Manage your workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 space-y-1">
           {[
             { name: 'Profile', icon: User, active: true },
             { name: 'Preferences', icon: Palette, active: false },
             { name: 'Notifications', icon: Bell, active: false },
             { name: 'Security', icon: Shield, active: false },
           ].map(item => (
             <div key={item.name} className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${item.active ? 'bg-zinc-900 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}`}>
               <item.icon className="w-4 h-4" />
               {item.name}
             </div>
           ))}
        </div>

        <div className="md:col-span-9 space-y-6">
          <Card className="border-zinc-800/60 bg-[#0a0a0a]">
            <CardHeader className="border-b border-zinc-800/50 pb-4">
              <CardTitle className="text-sm">Personal Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">First Name</label>
                  <Input defaultValue="Muskan" className="bg-zinc-900/50 border-zinc-800/80" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Last Name</label>
                  <Input placeholder="Enter last name" className="bg-zinc-900/50 border-zinc-800/80" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                <Input defaultValue="muskan@example.com" type="email" className="bg-zinc-900/50 border-zinc-800/80" />
              </div>
              <div className="pt-2 flex justify-end">
                <Button size="sm">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
import { UploadCloud, ArrowLeft, Plus } from "lucide-react";
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
    <div className="max-w-3xl mx-auto space-y-6 animate-in">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/podcasts">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">Upload Podcast</h1>
      </div>

      <Card className="border-zinc-800/60 bg-[#0a0a0a]">
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Audio File</label>
              <div className="border border-dashed border-zinc-700/80 bg-zinc-900/30 rounded-xl p-12 text-center hover:bg-zinc-900/60 hover:border-zinc-500 transition-all cursor-pointer group flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-5 h-5 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                </div>
                <p className="text-sm text-zinc-200 font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-[11px] text-zinc-500">MP3, WAV, M4A up to 500MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Podcast Title</label>
                <Input required placeholder="e.g., The Future of AI in SaaS" className="bg-zinc-900/50 border-zinc-800/80 h-10" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Category</label>
                <select className="w-full h-10 rounded-md border border-zinc-800/80 bg-zinc-900/50 px-3 text-sm text-zinc-100 focus:border-zinc-500 focus:ring-0 outline-none">
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Language</label>
                <select className="w-full h-10 rounded-md border border-zinc-800/80 bg-zinc-900/50 px-3 text-sm text-zinc-100 focus:border-zinc-500 focus:ring-0 outline-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800/50 flex justify-end gap-3">
              <Link href="/podcasts">
                <Button type="button" variant="ghost">Cancel</Button>
              </Link>
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? 'Uploading...' : 'Start AI Processing'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
""")

print("Done upgrading remaining pages")
