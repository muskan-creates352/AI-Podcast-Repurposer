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
                 <stat.icon className="w-4 h-4 text-violet-400/80" />
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
                   <div className="h-full bg-violet-500/80 rounded-full" style={{ width: `${plat.pct}%` }} />
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
