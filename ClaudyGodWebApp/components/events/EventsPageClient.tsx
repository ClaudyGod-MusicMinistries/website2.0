'use client';

import { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Image as ImageIcon, Heart } from 'lucide-react';
import { cn } from '@/utils/cn';
import { EventCard } from './EventCard';
import { EventDetailModal } from './EventDetailModal';
import { MOCK_EVENTS, EventStatus, type Event } from '@/data/events';

type TabType = 'upcoming' | 'ongoing' | 'completed';

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'upcoming', label: 'Upcoming', icon: <Calendar className="w-4 h-4" /> },
  { id: 'ongoing', label: 'Ongoing', icon: <Clock className="w-4 h-4" /> },
  { id: 'completed', label: 'Completed', icon: <Video className="w-4 h-4" /> },
];

export function EventsPageClient() {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set());

  const filteredEvents = useMemo(() => {
    const statusMap: Record<TabType, EventStatus> = {
      upcoming: 'upcoming',
      ongoing: 'ongoing',
      completed: 'completed',
    };

    return MOCK_EVENTS.filter((e) => e.status === statusMap[activeTab]).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [activeTab]);

  const toggleLike = (eventId: string) => {
    setLikedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const getEmptyState = () => {
    switch (activeTab) {
      case 'upcoming':
        return 'No upcoming events scheduled. Check back soon!';
      case 'ongoing':
        return 'No events happening right now.';
      case 'completed':
        return 'No completed events yet.';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 via-black to-neutral-900">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-bricolage font-bold text-5xl md:text-6xl text-white mb-4">
            Events & Tours
          </h1>
          <p className="font-raleway text-lg text-neutral-400 max-w-2xl mx-auto">
            Join Minister ClaudyGod at upcoming events, concerts, and ministry tours. Experience spirit-filled worship and ministry in your city.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-6 overflow-x-auto py-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]',
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isLiked={likedEvents.has(event.id)}
                  onLike={() => toggleLike(event.id)}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-neutral-400 text-lg">{getEmptyState()}</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isLiked={likedEvents.has(selectedEvent.id)}
          onLike={() => toggleLike(selectedEvent.id)}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </main>
  );
}
