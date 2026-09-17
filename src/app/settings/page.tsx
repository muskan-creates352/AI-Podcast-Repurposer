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
