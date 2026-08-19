'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import { ArrowUp, BarChart3, BrainCircuit, ChevronDown, FileText, FolderKanban, Menu, Mic, Paperclip, Plus, ShieldCheck, Sparkles, X } from 'lucide-react'

const suggestions = ['Summarize active project risks', 'Find the latest plan revision', 'Show dashboard performance']

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
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r border-line bg-panel transition-transform md:static md:translate-x-0`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-accent text-background"><BrainCircuit size={20} /></div><span className="font-semibold tracking-tight">BUILDVISION</span></div>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-muted hover:bg-panel-strong md:hidden" aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="flex-1 space-y-8 px-4 py-6">
          <div><p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-muted">Workspace</p><nav className="space-y-1"><NavItem icon={<FolderKanban size={18} />} label="Projects" active /><NavItem icon={<BarChart3 size={18} />} label="Dashboard" /><NavItem icon={<FileText size={18} />} label="Documents" /></nav></div>
          <div><p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-muted">Recent context</p><div className="space-y-2"><ContextItem title="Downtown Medical Center" meta="Last active · 2m ago" /><ContextItem title="Northline Residences" meta="Plan set · 8m ago" /></div></div>
        </div>
        <div className="border-t border-line p-4"><div className="flex items-center gap-3 rounded-xl bg-panel-strong p-3"><div className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-accent">JD</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">Jordan Davis</p><p className="text-xs text-muted">Project lead</p></div><ChevronDown size={16} className="text-muted" /></div></div>
      </aside>
      {sidebarOpen && <button className="fixed inset-0 z-20 bg-background/70 md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" />}

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-line px-4 sm:px-8"><div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-muted hover:bg-panel md:hidden" aria-label="Open navigation"><Menu size={20} /></button><div><p className="text-xs uppercase tracking-[.16em] text-muted">Command center</p><h1 className="text-base font-semibold">Jarvis assistant</h1></div></div><div className="flex items-center gap-3 text-xs text-muted"><span className="hidden items-center gap-2 sm:flex"><span className="size-2 rounded-full bg-accent" />Systems nominal</span><button className="flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 hover:bg-panel" aria-label="Assistant settings"><ShieldCheck size={15} /> <span className="hidden sm:inline">Private session</span></button></div></header>
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 sm:px-8">
          <div className="flex items-center justify-between border-b border-line py-4"><div className="flex items-center gap-3"><div className="relative flex size-10 items-center justify-center"><div className="orb-ring absolute inset-0 rounded-full border border-accent/40" /><div className="orb-core flex size-7 items-center justify-center rounded-full bg-accent text-background"><Sparkles size={14} /></div></div><div><p className="text-sm font-semibold">Jarvis</p><p className="text-xs text-muted">BuildVision intelligence layer</p></div></div><button onClick={() => setMessages([])} className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs text-muted hover:bg-panel hover:text-foreground"><Plus size={15} /> New session</button></div>
          <div className="flex flex-1 flex-col justify-end py-8 sm:py-12">
            {messages.length === 0 ? <div className="pb-8"><p className="mb-3 text-xs font-medium uppercase tracking-[.18em] text-accent">Ready when you are</p><h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Your project data, <span className="text-muted">at command.</span></h2><p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted">Ask Jarvis to make sense of your projects, plans, documents, and dashboard signals. Start with a question or choose a prompt below.</p><div className="mt-8 flex flex-wrap gap-2">{suggestions.map((item) => <button key={item} onClick={() => submit(item)} className="min-h-11 rounded-full border border-line bg-panel px-4 text-sm text-muted transition hover:border-accent/50 hover:text-foreground">{item}</button>)}</div></div> : <div className="space-y-6 pb-8">{messages.map((message) => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`${message.role === 'user' ? 'bg-accent text-background' : 'border border-line bg-panel'} max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%]`}>{message.parts.map((part, index) => part.type === 'text' ? <p key={index} className="whitespace-pre-wrap">{part.text}</p> : null)}</div></div>)}</div>}
            {error && <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">Jarvis could not connect. Check the AI Gateway connection and try again.</div>}
            {isLoading && <div className="mb-4 flex items-center gap-2 text-sm text-muted"><span className="size-2 animate-pulse rounded-full bg-accent" /> Jarvis is thinking…</div>}
            <div className="rounded-2xl border border-line bg-panel p-2 shadow-2xl shadow-black/10"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); submit() } }} placeholder="Ask Jarvis about your BuildVision workspace…" className="min-h-14 w-full resize-none bg-transparent px-3 py-2 text-base leading-relaxed outline-none placeholder:text-muted" rows={2} aria-label="Message Jarvis" /><div className="flex items-center justify-between px-2 pb-1"><div className="flex items-center gap-1"><button className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-panel-strong hover:text-foreground" aria-label="Attach context"><Paperclip size={18} /></button><button className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-panel-strong hover:text-foreground" aria-label="Use voice input"><Mic size={18} /></button><span className="ml-2 hidden text-xs text-muted sm:inline">Jarvis can work across projects and documents</span></div><button onClick={() => submit()} disabled={!input.trim() || isLoading} className="flex size-11 items-center justify-center rounded-xl bg-accent text-background transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message"><ArrowUp size={19} /></button></div></div>
          </div>
        </div>
      </section>
    </main>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) { return <button className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm ${active ? 'bg-panel-strong text-foreground' : 'text-muted hover:bg-panel-strong hover:text-foreground'}`}>{icon}{label}</button> }
function ContextItem({ title, meta }: { title: string; meta: string }) { return <button className="w-full rounded-xl px-3 py-3 text-left hover:bg-panel-strong"><p className="truncate text-sm text-foreground">{title}</p><p className="mt-1 text-xs text-muted">{meta}</p></button> }
