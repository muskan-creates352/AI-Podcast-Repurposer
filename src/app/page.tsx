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
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-400" /> AI Pipeline Status</h2>
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
                  step.status === 'done' ? 'bg-violet-600 border-violet-600 text-white' :
                  step.status === 'active' ? 'bg-zinc-900 border-violet-500 text-violet-200 ring-4 ring-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]' :
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
                <stat.icon className="w-4 h-4 text-violet-400/80" />
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
                <div key={i} className="w-full bg-violet-600/80 hover:bg-violet-500 transition-all rounded-t-sm relative group" style={{ height: `${(val/15)*100}%` }}>
                   <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-violet-900 text-violet-100 border border-violet-500/30 text-xs px-2 py-1 rounded text-zinc-200 transition-opacity">{val}</div>
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
                <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 z-10 group-hover:border-violet-500/50 transition-colors">
                  <activity.icon className="w-3.5 h-3.5 text-violet-400/70" />
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
