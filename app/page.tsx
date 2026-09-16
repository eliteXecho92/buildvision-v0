'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import { ArrowUp, BarChart3, Bot, BrainCircuit, ChevronDown, CircleDot, FileText, FolderKanban, GitBranch, Menu, Network, Plus, ShieldCheck, Sparkles, X, Zap } from 'lucide-react'

const suggestions = ['Review active project risks', 'Trace the latest deployment', 'Prepare a founder brief']
const providers = [
  { name: 'Gemma', detail: 'fast reasoning', color: 'bg-sky-400' },
  { name: 'ChatGPT', detail: 'general intelligence', color: 'bg-emerald-400' },
  { name: 'Grok', detail: 'live signals', color: 'bg-violet-400' },
  { name: 'Hugging Face', detail: 'open models', color: 'bg-amber-300' },
  { name: 'Ollama / Llama', detail: 'private local lane', color: 'bg-orange-400' },
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error, setMessages } = useChat()
  const isLoading = status === 'submitted' || status === 'streaming'

  async function submit(text = input) {
    const value = text.trim()
    if (!value || isLoading) return
    setInput('')
    await sendMessage({ text: value })
  }

  return (
    <main className="flex min-h-dvh bg-background text-foreground">
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-[286px] flex-col border-r border-line bg-panel transition-transform md:static md:translate-x-0`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-accent text-background"><BrainCircuit size={20} /></div><span className="font-semibold tracking-tight">BUILDVISION</span></div>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-muted hover:bg-panel-strong md:hidden" aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="flex-1 space-y-7 px-4 py-6">
          <div><p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-muted">Control plane</p><nav className="space-y-1"><NavItem icon={<Bot size={18} />} label="S.A.M. command room" active /><NavItem icon={<FolderKanban size={18} />} label="Projects" /><NavItem icon={<BarChart3 size={18} />} label="System telemetry" /></nav></div>
          <div><p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-muted">Connected systems</p><div className="space-y-1"><NavItem icon={<GitBranch size={17} />} label="Code & deployments" /><NavItem icon={<FileText size={17} />} label="Plans & documents" /><NavItem icon={<Network size={17} />} label="Operations graph" /></div></div>
          <div><p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-muted">Recent scope</p><ContextItem title="Downtown Medical Center" meta="12 active signals" /><ContextItem title="Northline Residences" meta="Plan set updated 8m ago" /></div>
        </div>
        <div className="border-t border-line p-4"><div className="flex items-center gap-3 rounded-xl bg-panel-strong p-3"><div className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-accent">JD</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">Jordan Davis</p><p className="text-xs text-muted">Founder override</p></div><ChevronDown size={16} className="text-muted" /></div></div>
      </aside>
      {sidebarOpen && <button className="fixed inset-0 z-20 bg-background/70 md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" />}

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[72px] items-center justify-between border-b border-line px-4 sm:px-8"><div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-muted hover:bg-panel md:hidden" aria-label="Open navigation"><Menu size={20} /></button><div><p className="text-xs uppercase tracking-[.16em] text-muted">Founder control plane</p><h1 className="text-base font-semibold">S.A.M. · Strategic AI Manager</h1></div></div><div className="flex items-center gap-3 text-xs text-muted"><span className="hidden items-center gap-2 sm:flex"><span className="size-2 rounded-full bg-accent" />Autonomy online</span><button className="flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 hover:bg-panel" aria-label="Open governance controls"><ShieldCheck size={15} /> <span className="hidden sm:inline">Founder override</span></button></div></header>
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-8">
          <div className="flex items-center justify-between border-b border-line py-4"><div className="flex items-center gap-3"><div className="relative flex size-10 items-center justify-center"><div className="orb-ring absolute inset-0 rounded-full border border-accent/40" /><div className="orb-core flex size-7 items-center justify-center rounded-full bg-accent text-background"><Sparkles size={14} /></div></div><div><p className="text-sm font-semibold">S.A.M.</p><p className="text-xs text-muted">Strategic AI Manager · ecosystem orchestration</p></div></div><button onClick={() => setMessages([])} className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs text-muted hover:bg-panel hover:text-foreground"><Plus size={15} /> New run</button></div>
          <div className="grid gap-6 py-7 lg:grid-cols-[1fr_280px] lg:py-10">
            <div className="flex min-w-0 flex-col justify-end">
              {messages.length === 0 ? <div className="pb-6"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"><Zap size={13} /> Autonomous orchestration active</div><h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-.04em] sm:text-5xl">One strategic layer for <span className="text-muted">every BuildVision signal.</span></h2><p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted">S.A.M. coordinates projects, documents, deployments, telemetry, and intelligence providers into decisions and action. This is the operating layer for the ecosystem—not another chatbot.</p><div className="mt-8 flex flex-wrap gap-2">{suggestions.map((item) => <button key={item} onClick={() => submit(item)} className="min-h-11 rounded-full border border-line bg-panel px-4 text-sm text-muted transition hover:border-accent/50 hover:text-foreground">{item}</button>)}</div></div> : <div className="space-y-6 pb-6">{messages.map((message) => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`${message.role === 'user' ? 'bg-accent text-background' : 'border border-line bg-panel'} max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%]`}>{message.parts.map((part, index) => part.type === 'text' ? <p key={index} className="whitespace-pre-wrap">{part.text}</p> : null)}</div></div>)}</div>}
              {error && <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">S.A.M. could not reach the intelligence layer. Check the gateway connection and retry.</div>}
              {isLoading && <div className="mb-4 flex items-center gap-2 text-sm text-muted"><span className="size-2 animate-pulse rounded-full bg-accent" /> S.A.M. is coordinating signals…</div>}
              <div className="rounded-2xl border border-line bg-panel p-2 shadow-2xl shadow-black/10"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); submit() } }} placeholder="Give S.A.M. a strategic objective…" className="min-h-14 w-full resize-none bg-transparent px-3 py-2 text-base leading-relaxed outline-none placeholder:text-muted" rows={2} aria-label="Message S.A.M." /><div className="flex items-center justify-between px-2 pb-1"><div className="flex items-center gap-2 text-xs text-muted"><CircleDot size={13} className="text-accent" /> <span className="hidden sm:inline">Cross-system context enabled</span></div><button onClick={() => submit()} disabled={!input.trim() || isLoading} className="flex size-11 items-center justify-center rounded-xl bg-accent text-background transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send objective"><ArrowUp size={19} /></button></div></div>
            </div>
            <aside className="rounded-2xl border border-line bg-panel p-4 lg:mt-3"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Intelligence mesh</p><span className="flex items-center gap-1 text-[11px] text-accent"><span className="size-1.5 rounded-full bg-accent" /> live</span></div><p className="mt-3 text-sm leading-relaxed text-muted">S.A.M. selects the best available model per objective, with fallback and provenance.</p><div className="mt-5 space-y-3">{providers.map((provider) => <div key={provider.name} className="flex items-center gap-3"><span className={`size-2 rounded-full ${provider.color}`} /><div className="min-w-0"><p className="truncate text-sm">{provider.name}</p><p className="text-xs text-muted">{provider.detail}</p></div><span className="ml-auto text-[10px] uppercase tracking-wider text-accent">ready</span></div>)}</div><div className="mt-6 border-t border-line pt-4"><p className="text-xs text-muted">Control status</p><div className="mt-3 flex items-center justify-between text-sm"><span>Founder override</span><span className="rounded-full bg-accent-soft px-2 py-1 text-xs text-accent">available</span></div></div></aside>
          </div>
        </div>
      </section>
    </main>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) { return <button className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm ${active ? 'bg-panel-strong text-foreground' : 'text-muted hover:bg-panel-strong hover:text-foreground'}`}>{icon}{label}</button> }
function ContextItem({ title, meta }: { title: string; meta: string }) { return <button className="w-full rounded-xl px-3 py-3 text-left hover:bg-panel-strong"><p className="truncate text-sm text-foreground">{title}</p><p className="mt-1 text-xs text-muted">{meta}</p></button> }
