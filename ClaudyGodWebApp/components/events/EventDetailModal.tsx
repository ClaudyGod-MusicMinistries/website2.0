'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
} from 'lucide-react';
import { type Event } from '@/data/events';
import { cn } from '@/utils/cn';

interface EventDetailModalProps {
  event: Event;
  isLiked: boolean;
  onLike: () => void;
  onClose: () => void;
}

export function EventDetailModal({
  event,
  isLiked,
  onLike,
  onClose,
}: EventDetailModalProps) {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const allHighlights = event.highlights
    ? [...event.highlights.images, ...event.highlights.videos]
    : [];

  const currentHighlight = allHighlights[highlightIndex];
  const isVideo = (h: typeof allHighlights[0]) => 'videoId' in h;

  const handleRegister = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      alert('Registration submitted! Check your email for confirmation.');
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 className="font-bricolage font-bold text-xl text-white">{event.title}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-purple-300 text-sm font-semibold mb-4">EVENT DETAILS</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-neutral-500">Date</p>
                      <p className="text-white font-medium">{formattedDate}</p>
                    </div>
                  </div>

                  {event.time && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Time</p>
                        <p className="text-white font-medium">{event.time}</p>
                      </div>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Location</p>
                        <p className="text-white font-medium">{event.location}</p>
                      </div>
                    </div>
                  )}

                  {event.attendees !== undefined && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Attendees</p>
                        <p className="text-white font-medium">{event.attendees}+ registered</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Description */}
              <div>
                <h3 className="text-purple-300 text-sm font-semibold mb-4">ABOUT THIS EVENT</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{event.fullDescription}</p>
              </div>
            </div>

            {/* Highlights */}
            {allHighlights.length > 0 && (
              <div>
                <h3 className="text-purple-300 text-sm font-semibold mb-4">HIGHLIGHTS</h3>
                <div className="space-y-4">
                  {/* Current Highlight */}
                  <div className="relative bg-neutral-800 rounded-lg overflow-hidden aspect-video">
                    {currentHighlight && 'url' in currentHighlight ? (
                      <Image
                        src={currentHighlight.url}
                        alt={currentHighlight.caption}
                        fill
                        className="object-cover"
                      />
                    ) : currentHighlight && 'videoId' in currentHighlight ? (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center cursor-pointer hover:bg-purple-600/40 transition-colors">
                          <Play className="w-8 h-8 text-purple-400 ml-1" />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Highlight Caption */}
                  {currentHighlight && (
                    <p className="text-sm text-neutral-400">{currentHighlight.caption}</p>
                  )}

                  {/* Navigation */}
                  {allHighlights.length > 1 && (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          setHighlightIndex((i) =>
                            i === 0 ? allHighlights.length - 1 : i - 1,
                          )
                        }
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <p className="text-sm text-neutral-400">
                        {highlightIndex + 1} / {allHighlights.length}
                      </p>
                      <button
                        onClick={() =>
                          setHighlightIndex((i) =>
                            i === allHighlights.length - 1 ? 0 : i + 1,
                          )
                        }
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={onLike}
                className={cn(
                  'flex-1 h-12 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2',
                  isLiked
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
                )}
              >
                <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                {isLiked ? 'Liked' : 'Like'}
              </button>

              {event.status === 'upcoming' && (
                <button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-purple-700 disabled:to-purple-800 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  {isRegistering ? 'Registering...' : 'Register Now'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
