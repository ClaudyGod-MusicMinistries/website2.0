# 🔄 Component Migration Checklist

> Migrate all components from static data to backend-driven dynamic data

## Status Summary

```
Total Components: 23
Completed: 1 (Help/FAQ Page)
Remaining: 22
Priority: HIGH
```

---

## 📋 Migration Checklist

### 🎵 Music/Albums Pages

- [ ] **components/music/MusicPageClient.tsx**
  - Status: Uses `data/music.tsx` (MOCK DATA)
  - Action: Replace with `useAlbums()` hook
  - Delete: `data/music.tsx`

- [ ] **components/music/AlbumGrid.tsx**
  - Status: Maps hardcoded albums
  - Action: Accept albums from parent, use responsive grid
  - Note: Fix responsive grid to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

- [ ] **components/music/MusicPlayer.tsx**
  - Status: Hardcoded tracks
  - Action: Fetch from backend album data

- [ ] **components/music/SongCard.tsx**
  - Status: Display individual songs
  - Action: Ensure responsive layout

### 📅 Events Pages

- [ ] **components/events/EventsPageClient.tsx**
  - Status: Uses `data/events.ts` (MOCK DATA)
  - Action: Replace with `useEvents()` hook
  - Delete: `data/events.ts`
  - Fix responsive: Use grid `grid-cols-1 md:grid-cols-2`

- [ ] **components/news/EventsSection.tsx**
  - Status: Has mock events in-place
  - Action: Add `useEvents()` hook
  - Note: Already partially updated

- [ ] **components/events/EventCard.tsx**
  - Status: Display event card
  - Action: Ensure responsive sizing
  - Fix: Responsive text sizes

- [ ] **components/events/EventDetailModal.tsx**
  - Status: Show event details
  - Action: Fetch from API
  - Fix: Modal responsive on mobile

### 📝 Blog Pages

- [ ] **components/blog/BlogPageClient.tsx**
  - Status: Uses `data/news.ts` (MOCK DATA)
  - Action: Replace with `useBlogPosts()` hook
  - Delete: `data/news.ts`

- [ ] **components/blog/BlogCard.tsx**
  - Status: Display blog posts
  - Action: Responsive design fix

- [ ] **components/blog/BlogDetail.tsx**
  - Status: Single blog post view
  - Action: Fetch from API

### 🛍️ Store/Shop Pages

- [ ] **components/store/StorePageClient.tsx**
  - Status: Uses `data/store.ts` (MOCK DATA)
  - Action: Replace with `useStoreProducts()` hook
  - Delete: `data/store.ts`

- [ ] **components/store/ProductCard.tsx**
  - Status: Display products
  - Action: Fix responsive layout
  - Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

- [ ] **components/store/ProductGrid.tsx**
  - Status: Show product list
  - Action: Use hook with pagination

- [ ] **components/store/CategoryFilter.tsx**
  - Status: Filter products
  - Action: Work with `useStoreProducts(category)`

### 🎬 Media/Gallery Pages

- [ ] **components/videos/VideosPageClient.tsx**
  - Status: Uses `data/interviews.ts` (MOCK DATA)
  - Action: Replace with `useMedia()` hook
  - Delete: `data/interviews.ts`

- [ ] **components/videos/VideoCard.tsx**
  - Status: Display video
  - Action: Responsive design

- [ ] **components/videos/VideoGrid.tsx**
  - Status: Grid of videos
  - Action: Use hook

### 🏠 Home/Landing Pages

- [ ] **components/home/HeroSection.tsx**
  - Status: Static hero with `data/heroSlides.ts`
  - Action: Consider keeping as static (branding) OR move to backend
  - Decision: KEEP STATIC (branding, doesn't change often)

- [ ] **components/news/NewsSection.tsx**
  - Status: Shows news/blog preview
  - Action: Use `useBlogPosts()` hook

- [ ] **components/ministry/VolunteersSection.tsx**
  - Status: Static content
  - Action: Keep static (informational)

### ⚙️ Utility Components (No Changes Needed)

- [ ] **components/layout/Navbar.tsx** - Static (nav structure)
- [ ] **components/layout/Footer.tsx** - Static (footer structure)
- [ ] **components/ui/*** - Reusable UI components (no changes)

---

## 🚀 Migration Process

For each component, follow this process:

### Step 1: Identify Current Data Source
```typescript
// Current (BAD)
import { MOCK_EVENTS } from '@/data/events';

export function EventsPage() {
  return MOCK_EVENTS.map(...)
}
```

### Step 2: Add Hook
```typescript
// Updated (GOOD)
import { useEvents } from '@/hooks';

export function EventsPageClient() {
  const { events, loading, error, refetch } = useEvents();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage onRetry={refetch} />;
  
  return events.map(...)
}
```

### Step 3: Fix Responsive Design
```typescript
// Ensure responsive classes
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Items with proper spacing */}
</div>
```

### Step 4: Test
- [ ] Mobile (360px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)
- [ ] No console errors
- [ ] Data loads from API

### Step 5: Delete Mock Data
```bash
rm data/old-mock-file.ts
```

---

## 📊 Data Migration Matrix

| Data Type | File | API Route | Hook | Status |
|-----------|------|-----------|------|--------|
| Events | `data/events.ts` | `/api/events` | `useEvents()` | ⏳ Ready |
| Albums | `data/music.tsx` | `/api/albums` | `useAlbums()` | ⏳ Ready |
| Blog Posts | `data/news.ts` | `/api/blog` | `useBlogPosts()` | ⏳ Ready |
| Store Products | `data/store.ts` | `/api/store/products` | `useStoreProducts()` | ⏳ Ready |
| Media Items | `data/interviews.ts` | `/api/media` | `useMedia()` | ⏳ Ready |
| FAQs | None | `/api/faqs` | `useFAQs()` | ✅ Done |

---

## 🔧 Quick Migration Template

```typescript
// ============ BEFORE ============
// components/feature/FeaturePageClient.tsx

import { MOCK_DATA } from '@/data/mockfile';

export function FeaturePageClient() {
  return (
    <div>
      {MOCK_DATA.map(item => <Card item={item} />)}
    </div>
  );
}

// ============ AFTER ============
// components/feature/FeaturePageClient.tsx

import { useFeature } from '@/hooks';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export function FeaturePageClient() {
  const { data, loading, error, refetch } = useFeature();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {data.map(item => <Card item={item} />)}
    </div>
  );
}
```

---

## 📁 Files to Delete After Migration

Once components are migrated:

```
data/
├── events.ts              ❌ DELETE
├── music.tsx              ❌ DELETE
├── news.ts                ❌ DELETE
├── store.ts               ❌ DELETE
├── interviews.ts          ❌ DELETE
│
├── navbar.ts              ✅ KEEP (nav structure)
├── socials.ts             ✅ KEEP (footer links)
├── heroSlides.ts          ✅ KEEP (hero branding)
└── [others kept as-is]
```

---

## 🎯 Priority Order

### Tier 1 (Start Here)
1. EventsSection / EventsPage
2. Music / Albums
3. Blog / News

### Tier 2 (Next)
4. Store / Products
5. Media / Videos

### Tier 3 (Final)
6. Utility components polish
7. Responsive design refinements

---

## ✅ Completion Checklist

### Phase 1: Data Migration
- [ ] Events migrated
- [ ] Albums migrated
- [ ] Blog posts migrated
- [ ] Store products migrated
- [ ] Media items migrated

### Phase 2: Responsive Design
- [ ] Mobile (360px) tested
- [ ] Tablet (768px) tested
- [ ] Desktop (1024px) tested
- [ ] No layout breaks
- [ ] All grids responsive

### Phase 3: Cleanup
- [ ] Mock data files deleted
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] All links working
- [ ] API calls successful

### Phase 4: Testing
- [ ] Manual testing complete
- [ ] E2E tests passing
- [ ] Performance metrics good
- [ ] Security reviewed
- [ ] Ready for production

---

## 📞 Support Commands

```bash
# Test specific component
npm run dev
# Navigate to page and check DevTools

# Check API responses
curl http://localhost:3000/api/events
curl http://localhost:3000/api/albums

# Run tests
npm run test

# Check performance
npm run lighthouse
```

---

## ⚠️ Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Data not loading | API not running | Check backend, verify endpoint |
| Layout breaking | Missing responsive classes | Add `grid-cols-1 sm:grid-cols-2` |
| Images not showing | Missing sizes prop | Add `sizes="(max-width:768px) 100vw, 50vw"` |
| Slow loading | No pagination | Add pagination to list endpoints |
| CORS error | API mismatch | Verify API routes exist |

---

**Status**: Ready to Begin Migration  
**Estimated Time**: 8-12 hours  
**Difficulty**: Medium  
**Blocker**: None - All tools ready

Start with **EventsSection** for quickest wins! 🚀
