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
