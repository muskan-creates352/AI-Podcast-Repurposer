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
                           <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex-1"><div className="h-full bg-violet-500/80 rounded-full" style={{width: topic.match(/\d+/)?.[0] + '%'}}></div></div>
                           <span className="w-32">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-zinc-800/60 bg-zinc-900/10">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-medium text-zinc-200 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-400" /> Suggested Content Angles</h3>
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
                <Sparkles className="w-8 h-8 text-violet-500 mx-auto mb-4 drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]" />
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
