'use client';

import Image from 'next/image';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { type Event } from '@/data/events';
import { cn } from '@/utils/cn';

interface EventCardProps {
  event: Event;
  isLiked: boolean;
  onLike: () => void;
  onClick: () => void;
}

export function EventCard({ event, isLiked, onLike, onClick }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getStatusColor = () => {
    switch (event.status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ongoing':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  const getStatusLabel = () => {
    return event.status.charAt(0).toUpperCase() + event.status.slice(1);
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer h-full rounded-xl overflow-hidden bg-neutral-900/50 border border-white/10 hover:border-purple-600/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-neutral-800">
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className={cn('absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border', getStatusColor())}>
          {getStatusLabel()}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className={cn(
            'absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
            isLiked
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-white/10 text-white/70 hover:text-white border border-white/20 hover:border-white/40',
          )}
        >
          <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bricolage font-bold text-base sm:text-lg text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {event.title}
        </h3>

        {/* Date & Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-sm text-neutral-400">
            <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-purple-400" />
            <span>{formattedDate}</span>
          </div>
          {event.location && (
            <div className="flex items-start gap-2 text-sm text-neutral-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-purple-400" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{event.description}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
          {event.highlights && (
            <span>
              {event.highlights.images.length + event.highlights.videos.length} highlights
            </span>
          )}
          <span>{isLiked ? 'Liked' : 'Add to favorites'}</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClick}
          className="w-full h-9 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold text-sm rounded-lg transition-all duration-200"
        >
          {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
        </button>
      </div>
    </div>
  );
}
