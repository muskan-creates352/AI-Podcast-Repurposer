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
