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
