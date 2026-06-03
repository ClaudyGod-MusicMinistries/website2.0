'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Minimize2, Maximize2, Loader } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

export function AIChatbot({ isOpen: initialOpen = false, onToggle }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hello! I'm ClaudyGod's AI Assistant. I can help you with:

• 🎵 Music & Albums - Information about all 7 albums
• 📅 Events & Bookings - Upcoming tours and registration
• 🎁 Store & Donations - Products and giving options
• 📱 General Questions - About the ministry

How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    onToggle?.(isOpen);
  }, [isOpen, onToggle]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setIsMinimized(false);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content:
          error instanceof Error && error.message.includes('503')
            ? "I'm temporarily unavailable. Please try again in a moment."
            : 'Sorry, I encountered an error. Please try again or contact support.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={handleToggle}
        className={cn(
          'fixed bottom-6 right-6 z-[250] w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-[0_8px_32px_rgba(124,58,237,0.4)] transition-all duration-200',
          isOpen && 'opacity-0 pointer-events-none',
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-[250] w-96 h-[600px] rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bricolage font-bold text-white text-sm">ClaudyGod Assistant</h3>
                  <p className="text-purple-100 text-xs">Always here to help</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleMinimize}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-white" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <button
                  onClick={handleToggle}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'flex',
                        msg.role === 'user' ? 'justify-end' : 'justify-start',
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-xs px-4 py-2.5 rounded-lg text-sm leading-relaxed',
                          msg.role === 'user'
                            ? 'bg-purple-600 text-white rounded-br-none'
                            : 'bg-neutral-800 text-neutral-200 rounded-bl-none border border-white/10',
                        )}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 px-4 py-2"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-white/10 p-4 bg-neutral-900/50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="flex-1 bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600/30 transition-all disabled:opacity-50"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-700 disabled:opacity-50 rounded-lg flex items-center justify-center text-white transition-colors"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
