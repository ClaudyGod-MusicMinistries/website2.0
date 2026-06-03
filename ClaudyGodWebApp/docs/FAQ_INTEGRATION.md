# FAQ Backend Integration Guide

## Overview
The FAQ system has been fully integrated into a professional three-tier architecture:
- **Frontend**: React components fetching data via API routes
- **API Layer**: Next.js proxy routes and .NET API endpoints
- **Backend**: C# Domain-Driven Design with MediatR, EF Core, and SQL Server

## Architecture Flow

```
User Browser
    ↓
Frontend (React) - components/help/HelpPageClient.tsx
    ↓
Frontend API Route - app/api/faqs/route.ts
    ↓
Backend Proxy - utils/backendProxy.ts
    ↓
.NET API Controller - src/ClaudyGod.API/Controllers/FAQController.cs
    ↓
MediatR Handler - src/ClaudyGod.Application/Features/FAQs/Queries/GetFAQsQuery.cs
    ↓
Database - FAQ Entity
    ↓
Response (JSON with DTOs)
```

## Backend Components

### 1. Domain Entity
**File**: `src/ClaudyGod.Domain/Entities/FAQ.cs`
- Clean domain model following DDD principles
- Properties: Question, Answer, Category, Order, IsPublished
- Methods: Create(), Update(), Publish(), Unpublish()

### 2. EF Core Configuration
**File**: `src/ClaudyGod.Infrastructure/Persistence/Configurations/FAQConfiguration.cs`
- Entity mapping with constraints
- Indexes on Category + Order for efficient queries
- Index on IsPublished for filtering

### 3. Database Context
**File**: `src/ClaudyGod.Infrastructure/Persistence/ApplicationDbContext.cs`
- Added `DbSet<FAQ> FAQs` property
- Soft-delete filter: `!e.IsDeleted && e.IsPublished`
- Auto-updates CreatedAt/UpdatedAt timestamps

### 4. Application Layer
**Interface**: `src/ClaudyGod.Application/Common/Interfaces/IApplicationDbContext.cs`
- Added FAQ DbSet declaration

**DTO**: `src/ClaudyGod.Application/Features/FAQs/DTOs/FAQDto.cs`
- Clean data transfer object for API responses

**Query Handler**: `src/ClaudyGod.Application/Features/FAQs/Queries/GetFAQsQuery.cs`
- Implements CQRS pattern with MediatR
- Supports optional category filtering
- Orders by Category, then Order field
- Uses AsNoTracking() for read optimization

### 5. API Controller
**File**: `src/ClaudyGod.API/Controllers/FAQController.cs`
- Endpoints:
  - `GET /api/v1.0/faqs` - Get all FAQs (optional category filter)
  - `GET /api/v1.0/faqs/categories/{category}` - Get FAQs by category
- Integrated with API versioning
- Returns standardized `ApiResponse<List<FAQDto>>`

### 6. Security
**File**: `src/ClaudyGod.API/Middleware/ApiKeyMiddleware.cs`
- Added `/api/v1.0/faqs` to public endpoints
- No authentication required (FAQ data is public)

## Frontend Components

### 1. API Route (Proxy)
**File**: `app/api/faqs/route.ts`
- Proxies requests to backend `/faqs` endpoint
- Handles query parameter forwarding
- Error handling with fallback responses

### 2. React Component
**File**: `components/help/HelpPageClient.tsx`
- Features:
  - Fetches FAQ data on component mount
  - Loading state with spinner
  - Error state with user-friendly message
  - Category filtering (All, Music & Albums, Events, etc.)
  - Search functionality (full-text search)
  - Expandable accordion interface
  - Responsive design

### 3. Features
- **Dynamic Categories**: Categories loaded from database
- **Icon Mapping**: Icons mapped to categories automatically
- **Performance**: No waterfall loading, parallel data fetching
- **UX**: Smooth animations, loading indicators, error handling

## Database Setup

### Create Migration
```bash
cd /root/Tech_projects_000/Frontend/ClaudyGod-Backend
dotnet ef migrations add AddFAQ -p src/ClaudyGod.Infrastructure -s src/ClaudyGod.API
dotnet ef database update -p src/ClaudyGod.Infrastructure -s src/ClaudyGod.API
```

### Seed Data
Create FAQs via API (Admin endpoint - to be added) or directly in database:

```sql
INSERT INTO FAQs (Id, Question, Answer, Category, [Order], IsPublished, CreatedAt, IsDeleted)
VALUES 
  (NEWID(), 'Where can I stream ClaudyGod music?', 
   'You can stream all our albums on Spotify, Apple Music, YouTube Music, and more...', 
   'Music & Albums', 1, 1, GETUTCDATE(), 0),
  (NEWID(), 'How do I register for upcoming events?',
   'Visit our Events page to see all upcoming ministry tours and concerts...',
   'Events & Attendance', 1, 1, GETUTCDATE(), 0);
```

## API Usage

### Get All FAQs
```bash
curl -X GET "https://claudygod.com/api/faqs"
```

**Response**:
```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "question": "Where can I stream ClaudyGod music?",
      "answer": "You can stream all our albums on Spotify...",
      "category": "Music & Albums",
      "order": 1
    }
  ],
  "errors": [],
  "fieldErrors": {}
}
```

### Get FAQs by Category
```bash
curl -X GET "https://claudygod.com/api/faqs?category=Music%20%26%20Albums"
```

## Performance Optimizations

1. **Database Indexes**
   - Category + Order for efficient sorting
   - IsPublished for quick filtering

2. **Query Optimization**
   - `AsNoTracking()` for read-only queries
   - Projection to DTO early in query

3. **Frontend Caching**
   - Single fetch on component mount
   - No automatic refetching

## Future Enhancements

1. **Admin Panel**: Create/Edit/Delete FAQs
2. **Caching**: Redis cache for FAQ data
3. **Search**: Full-text search in database
4. **Analytics**: Track which FAQs are viewed most
5. **Webhooks**: Notify frontend when FAQs change

## Testing

### Unit Tests (Backend)
```csharp
[Fact]
public async Task GetFAQsQuery_ReturnsAllPublishedFAQs()
{
    // Arrange
    var query = new GetFAQsQuery();
    
    // Act
    var result = await handler.Handle(query, CancellationToken.None);
    
    // Assert
    Assert.NotEmpty(result);
}
```

### Integration Tests (E2E)
```typescript
test('Help page loads and displays FAQs from backend', async () => {
  const response = await fetch('/api/faqs');
  const data = await response.json();
  
  expect(data.success).toBe(true);
  expect(Array.isArray(data.data)).toBe(true);
});
```

## Troubleshooting

### FAQs not loading on frontend
1. Check browser console for API errors
2. Verify backend FAQ endpoint is running
3. Check that FAQs exist in database with `IsPublished = 1`

### CORS errors
- Verify frontend proxy route is working
- Check backend CORS configuration in Program.cs

### Database errors
- Ensure migration has been applied
- Verify FAQ table exists in database
- Check connection string in appsettings.json

## Standards & Best Practices

✅ **Implemented**
- Clean Architecture (Domain, Application, Infrastructure, API layers)
- CQRS Pattern (Query segregation via MediatR)
- DDD Principles (Rich domain entities)
- Soft Delete Pattern (Logical deletion with IsDeleted flag)
- API Versioning (/api/v1.0/)
- Error Handling (Standardized ApiResponse format)
- Dependency Injection (Constructor injection)

✅ **Frontend**
- React Hooks for state management
- Loading/Error states
- Accessible HTML structure
- Responsive design
- Smooth animations

## Next Steps

1. Run migrations to create FAQ table
2. Seed initial FAQ data
3. Deploy backend changes
4. Test FAQ endpoints
5. Verify frontend loads FAQs
6. Monitor performance in production
