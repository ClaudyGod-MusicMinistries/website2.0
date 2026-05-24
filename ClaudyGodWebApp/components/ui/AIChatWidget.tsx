'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Loader2, Bot, User,
  Sparkles, RotateCcw,
} from 'lucide-react';
import { cn } from '@/utils/cn';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type Mode = 'chat' | 'prayer';

const WELCOME: Record<Mode, string> = {
  chat: "Hi! I'm the ClaudyGod Ministry Assistant. How can I help you today? You can ask me about the music, upcoming events, bookings, or anything about the ministry.",
  prayer: "Welcome to the Prayer Corner. Share what's on your heart and I'll pray with you. Your request will be held in confidence.",
};

const PLACEHOLDER: Record<Mode, string> = {
  chat:   'Ask about music, events, or bookings…',
  prayer: 'Share your prayer request…',
};

const ENDPOINT: Record<Mode, string> = {
  chat:   '/api/ai/chat',
  prayer: '/api/ai/prayer',
};

function generateId() {
  return Math.random().toString(36).slice(2);
}

export function AIChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [mode,     setMode]     = useState<Mode>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);

  // Seed the welcome message when the widget opens or mode changes
  useEffect(() => {
    if (!open) return;
    setMessages([{
      id:        generateId(),
      role:      'assistant',
      content:   WELCOME[mode],
      timestamp: new Date(),
    }]);
    setInput('');
    setError(null);
  }, [open, mode]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: generateId(), role: 'user', content: text, timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const history = messages
        .slice(-10) // last 10 messages for context
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(ENDPOINT[mode], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? 'Something went wrong. Please try again.');
        return;
      }

      setMessages(prev => [...prev, {
        id:        generateId(),
        role:      'assistant',
        content:   data.data?.reply ?? '',
        timestamp: new Date(),
      }]);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, messages, mode]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    setMessages([{
      id: generateId(), role: 'assistant', content: WELCOME[mode], timestamp: new Date(),
    }]);
    setInput('');
    setError(null);
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl',
          'flex items-center justify-center',
          'bg-gradient-to-br from-purple-600 to-purple-800',
          'hover:from-purple-500 hover:to-purple-700 transition-all',
          'ring-2 ring-purple-400/30',
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? 'Close chat' : 'Open ministry assistant'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-purple-500/30 pointer-events-none" />
        )}
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'fixed bottom-24 right-6 z-50',
              'w-[360px] max-w-[calc(100vw-1.5rem)]',
              'h-[520px] max-h-[calc(100vh-8rem)]',
              'flex flex-col',
              'bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden',
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">Ministry Assistant</p>
                  <p className="text-neutral-500 text-xs mt-0.5">AI-powered · ClaudyGod</p>
                </div>
              </div>
              <button onClick={reset} title="Reset conversation" className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/5 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Mode tabs */}
            <div className="flex border-b border-white/10">
              {(['chat', 'prayer'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    'flex-1 py-2 text-xs font-medium capitalize transition-colors',
                    mode === m
                      ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/5'
                      : 'text-neutral-500 hover:text-neutral-300',
                  )}
                >
                  {m === 'prayer' ? '🙏 Prayer' : '💬 Chat'}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map(msg => (
                <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    msg.role === 'assistant'
                      ? 'bg-purple-600/20 border border-purple-500/30'
                      : 'bg-neutral-700/60 border border-white/10',
                  )}>
                    {msg.role === 'assistant'
                      ? <Bot className="w-3.5 h-3.5 text-purple-400" />
                      : <User className="w-3.5 h-3.5 text-neutral-400" />}
                  </div>
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'bg-neutral-800/80 text-neutral-200 rounded-tl-sm'
                      : 'bg-purple-600/90 text-white rounded-tr-sm',
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="bg-neutral-800/80 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {error && (
                <p className="text-center text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3 bg-neutral-900/80">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={PLACEHOLDER[mode]}
                  rows={1}
                  maxLength={1000}
                  className={cn(
                    'flex-1 resize-none bg-neutral-800 border border-white/10 rounded-xl',
                    'px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500',
                    'focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20',
                    'scrollbar-none max-h-[120px]',
                  )}
                  style={{ height: 'auto', minHeight: '42px' }}
                  onInput={e => {
                    const t = e.currentTarget;
                    t.style.height = 'auto';
                    t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
                  }}
                />
                <motion.button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.92 }}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                    input.trim() && !loading
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-neutral-800 text-neutral-600 cursor-not-allowed',
                  )}
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Send className="w-4 h-4" />}
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-neutral-600 mt-2">
                Powered by Claude AI · ClaudyGod Ministry
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
