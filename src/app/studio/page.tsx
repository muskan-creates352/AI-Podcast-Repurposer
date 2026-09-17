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
      setResult("🚀 AI is fundamentally shifting the SaaS landscape.\n\nIn our latest episode, we broke down why workflow orchestration—agents speaking to agents—is the true alpha for 2026, not just basic text generation.\n\nKey takeaways:\n1️⃣ Automation removes drudgery, it doesn't just replace jobs.\n2️⃣ If you aren't building an LLM strategy, you're behind.\n\nListen to the full breakdown now. 🎙️\n\n#SaaS #ArtificialIntelligence #Startups #FutureOfWork");
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
                       <Sparkles className="w-5 h-5 text-violet-400 animate-pulse drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
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
                           <div className={`w-1.5 h-1.5 rounded-full ${step >= item.s ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]' : 'bg-zinc-800'}`} />
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
