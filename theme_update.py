import os
import re

BASE_DIR = r"c:\Users\Rani\OneDrive\Pictures\Documents\AI-Podcast-Repurposer\ai-podcast-repurposer\src"

def replace_in_file(path, replacements):
    full_path = os.path.join(BASE_DIR, path)
    if not os.path.exists(full_path):
        return
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

# 1. BUTTON
replace_in_file("components/ui/Button.tsx", [
    ("'bg-zinc-100 text-zinc-900 hover:bg-white shadow-sm': variant === 'default',",
     "'bg-violet-600 text-white hover:bg-violet-500 shadow-sm shadow-violet-900/20': variant === 'default',")
])

# 2. SIDEBAR
replace_in_file("components/layout/Sidebar.tsx", [
    ('active ? "bg-zinc-800/80 text-zinc-100" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"',
     'active ? "bg-violet-500/15 text-violet-300" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"'),
    ('text-zinc-100">AI Repurposer</h1>',
     'text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-violet-400">AI Repurposer</h1>'),
    ('Sparkles className="w-5 h-5 text-zinc-100"',
     'Sparkles className="w-5 h-5 text-violet-400"')
])

# 3. DASHBOARD
replace_in_file("app/page.tsx", [
    ('bg-zinc-800/20 rounded-full blur-3xl',
     'bg-violet-900/20 rounded-full blur-3xl'),
    ('text-zinc-400" /> AI Pipeline Status',
     'text-violet-400" /> AI Pipeline Status'),
    ("step.status === 'done' ? 'bg-zinc-100 border-zinc-100 text-zinc-900' :",
     "step.status === 'done' ? 'bg-violet-600 border-violet-600 text-white' :"),
    ("step.status === 'active' ? 'bg-zinc-900 border-zinc-500 text-zinc-100 ring-4 ring-zinc-800/50' :",
     "step.status === 'active' ? 'bg-zinc-900 border-violet-500 text-violet-200 ring-4 ring-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]' :"),
    ("text-zinc-600\" />\n              </div>\n              <div className=\"mt-4",
     "text-violet-400/80\" />\n              </div>\n              <div className=\"mt-4"),
    ("w-full bg-zinc-800 hover:bg-zinc-700 transition-all rounded-t-sm",
     "w-full bg-violet-600/80 hover:bg-violet-500 transition-all rounded-t-sm"),
    ("absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800",
     "absolute -top-8 left-1/2 -translate-x-1/2 bg-violet-900 text-violet-100 border border-violet-500/30"),
    ("bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 z-10",
     "bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 z-10 group-hover:border-violet-500/50 transition-colors"),
    ("w-3.5 h-3.5 text-zinc-400",
     "w-3.5 h-3.5 text-violet-400/70")
])

# 4. STUDIO
replace_in_file("app/studio/page.tsx", [
    ('Sparkles className="w-5 h-5 text-zinc-400 animate-pulse"',
     'Sparkles className="w-5 h-5 text-violet-400 animate-pulse drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"'),
    ("step >= item.s ? 'bg-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-zinc-700'",
     "step >= item.s ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]' : 'bg-zinc-800'")
])

# 5. PODCAST DETAILS
replace_in_file("app/podcasts/[id]/page.tsx", [
    ('text-zinc-500 mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-zinc-500"',
     'text-zinc-200 mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-violet-400"'),
    ('h-full bg-zinc-400 rounded-full"',
     'h-full bg-violet-500/80 rounded-full"'),
    ('text-zinc-200 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-zinc-500"',
     'text-zinc-200 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-400"'),
    ('Sparkles className="w-8 h-8 text-zinc-600 mx-auto mb-4"',
     'Sparkles className="w-8 h-8 text-violet-500 mx-auto mb-4 drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]"')
])

# 6. ANALYTICS
replace_in_file("app/analytics/page.tsx", [
    ('stat.icon className="w-4 h-4 text-zinc-600"',
     'stat.icon className="w-4 h-4 text-violet-400/80"'),
    ('h-full bg-zinc-400 rounded-full"',
     'h-full bg-violet-500/80 rounded-full"')
])

# 7. BADGE
replace_in_file("components/ui/Badge.tsx", [
    ("'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': variant === 'success',",
     "'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]': variant === 'success',")
])

print("Theme updated successfully")
