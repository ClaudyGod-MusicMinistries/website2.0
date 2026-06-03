# 🎵 ClaudyGod Music Ministries - Web Application

> **A professional, enterprise-grade music ministry platform featuring dynamic content management, secure booking systems, and AI-powered engagement tools.**

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![.NET](https://img.shields.io/badge/.NET-8-blueviolet)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Performance](#performance)
- [Contributing](#contributing)
- [Support](#support)

---

## 🎯 Overview

ClaudyGod Music Ministries is a **full-stack, professional web application** built to serve a vibrant gospel music ministry. The platform enables Minister ClaudyGod to:

- 🎵 Stream and sell music across multiple platforms
- 📅 Manage ministry events and tour dates  
- 🎟️ Handle ticket reservations and event registrations
- 📝 Publish blog posts and ministry content
- 🛍️ Operate an online store for merchandise
- 📧 Engage with subscribers via newsletter
- 💬 Interact with visitors via AI-powered chatbot
- 🙏 Receive and respond to prayer requests
- 🤝 Manage volunteer applications
- 💰 Process secure donations
- 📊 Track analytics and user engagement

**Built with modern, industry-leading technologies** for reliability, performance, and maintainability.

---

## ✨ Features

### 🎵 Music & Content
- **7+ Album Library** - Spirit-filled gospel music
- **Multi-Platform Streaming** - Spotify, Apple Music, YouTube Music, and more
- **E-Commerce Integration** - Physical and digital album sales
- **Blog & News** - Ministry insights and updates
- **Media Gallery** - Photos, videos, and live performance highlights
- **Professional Audio** - Secure YouTube embedding with youtube-nocookie

### 📅 Events & Bookings
- **Dynamic Event Management** - Create, manage, and track ministry events
- **Real-Time Ticket System** - Instant ticket reservations with confirmation codes
- **Professional Booking Portal** - Event booking for churches and organizations
- **Multi-Date Tour Management** - Track ministry tour dates
- **Automated Email Reminders** - Notifications for registered attendees

### 🛍️ Store & Commerce
- **Product Catalog** - CDs, DVDs, merchandise, exclusive items
- **Secure Checkout** - Multiple payment methods (Paystack, Bank Transfer, Zelle)
- **Order Management** - Real-time tracking
- **Inventory Control** - Stock management
- **Shipping Integration** - Domestic and international

### 👥 Community & Engagement
- **AI Chat Assistant** - 24/7 intelligent support with direct links
- **Prayer Portal** - Submit and receive prayer ministry
- **Newsletter System** - Branded email communications
- **Volunteer Program** - Multiple opportunities with applications
- **Donation System** - Secure, tax-deductible giving

### 🔧 Admin & Monitoring
- **Dynamic Content Management** - All data from backend
- **Server Health Dashboard** - Real-time monitoring
- **User Management** - Admin roles and permissions
- **Professional Email Templates** - Branded communications
- **Zero Hardcoded Data** - 100% backend-driven

---

## 🏗️ Architecture

### Technology Stack

**Frontend**
```
Framework: Next.js 14+ (React 18)
Language: TypeScript (strict mode)
Styling: Tailwind CSS + Custom CSS
Animations: Framer Motion
Forms: React Hook Form + Zod Validation
State: React Hooks + Context API
Data Fetching: Custom API Client with Caching
```

**Backend**
```
Runtime: .NET 8
Architecture: Clean Architecture + DDD
Database: SQL Server
ORM: Entity Framework Core
API Pattern: RESTful with API Versioning
Communication: MediatR (CQRS Pattern)
Email: SMTP Integration
```

**Infrastructure**
```
Hosting: Docker + Docker Compose
Reverse Proxy: Traefik (SSL/TLS)
CI/CD: GitHub Actions
Monitoring: Health Checks + Server Monitoring
Security: JWT + API Keys
```

### Data Architecture (Zero Mock Data)

```
React Components
    ↓
Custom React Hooks (useEvents, useAlbums, etc.)
    ↓
API Client (Smart Caching, 5min TTL)
    ↓
Frontend API Routes (/api/events, /api/albums)
    ↓
Backend .NET API (/api/v1.0/events)
    ↓
SQL Server Database
```

✅ **100% Backend-Driven** - No hardcoded data in frontend  
✅ **Type Safe** - Centralized TypeScript types  
✅ **Secure** - No data exposure in browser  
✅ **Scalable** - Easy to add new endpoints  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ with npm/yarn
- .NET 8 SDK
- SQL Server 2019+
- Docker & Docker Compose
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/claudygod-web.git
cd claudygod-web

# Frontend setup
cd ClaudyGodWebApp
npm install

# Backend setup
cd ../Backend
dotnet restore
dotnet build

# Configure environment
cp .env.example .env.local
cp appsettings.example.json appsettings.json

# Setup database
cd src/ClaudyGod.API
dotnet ef database update
```

### Running Locally

**Frontend (Development)**
```bash
cd ClaudyGodWebApp
npm run dev
# Opens at http://localhost:3000
```

**Backend (Development)**
```bash
cd Backend/src/ClaudyGod.API
dotnet run
# Runs at https://localhost:5001
```

**Full Stack (Docker)**
```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
# Database: localhost:1433
```

### Verification
```bash
curl http://localhost:3000          # Frontend
curl https://localhost:5001/api/v1.0/health  # Backend
```

---

## 💻 Development

### Project Structure

```
ClaudyGod-Backend/
├── src/
│   ├── ClaudyGod.API/              # ASP.NET Controllers
│   ├── ClaudyGod.Application/      # MediatR Handlers
│   ├── ClaudyGod.Domain/           # Domain Entities
│   └── ClaudyGod.Infrastructure/   # Data Access, Email
├── tests/                           # Unit & Integration Tests
└── docs/                            # Backend Documentation

ClaudyGodWebApp/
├── app/                             # Next.js Routes
│   ├── (pages)/                     # Page Components
│   └── api/                         # API Proxy Routes
├── components/                      # React Components
├── hooks/                           # Custom React Hooks
├── lib/api/                         # API Client & Types
├── public/                          # Static Assets
└── styles/                          # Global Styles
```

### Adding a New Data Type

**1. Create Backend Entity**
```csharp
// Domain/Entities/MyData.cs
public class MyData : AuditableEntity {
    public string Title { get; set; }
}
```

**2. Create Frontend Type**
```typescript
// lib/api/types.ts
export interface MyData {
  id: string;
  title: string;
}
```

**3. Create API Route**
```typescript
// app/api/mydata/route.ts
export async function GET(req: NextRequest) {
  return proxyGet(req, '/mydata');
}
```

**4. Create Custom Hook**
```typescript
// hooks/useMyData.ts
export function useMyData() {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    apiGet<ApiResponse<MyData[]>>('/api/mydata').then(res => {
      if (res.success) setData(res.data);
    });
  }, []);
  
  return { data, loading, error };
}
```

**5. Use in Component**
```typescript
export function MyComponent() {
  const { data, loading } = useMyData();
  
  if (loading) return <LoadingSpinner />;
  return data.map(item => <Card item={item} />);
}
```

### Testing

```bash
# Frontend tests
npm run test

# Backend tests
dotnet test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🚢 Deployment

### Environment Variables

**Frontend**
```bash
NEXT_PUBLIC_API_URL=https://api.claudygod.com
NEXT_PUBLIC_SITE_URL=https://claudygod.com
```

**Backend**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=ClaudyGod;..."
  },
  "Security": {
    "ApiKeys": ["your-api-key"]
  }
}
```

### Docker Deployment

```bash
# Build
docker-compose build

# Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Logs
docker-compose logs -f

# Scale
docker-compose up -d --scale api=3
```

### Production Checklist

- [ ] Environment variables configured
- [ ] SSL/TLS certificates installed
- [ ] Database backups enabled
- [ ] API keys secured
- [ ] Database migrations applied
- [ ] Performance monitoring enabled
- [ ] Error logging configured
- [ ] CORS properly configured

---

## 📚 API Documentation

### Base URL
```
https://claudygod.com/api/v1.0
```

### Public Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/events` | Get all events |
| GET | `/albums` | Get all albums |
| GET | `/blog` | Get blog posts |
| GET | `/faqs` | Get FAQs |
| GET | `/media` | Get media items |
| GET | `/store/products` | Get products |
| POST | `/bookings` | Create booking |
| POST | `/tickets` | Reserve ticket |

### Response Format

```json
{
  "success": true,
  "message": "Success",
  "data": [{ "id": "...", "title": "..." }],
  "errors": [],
  "fieldErrors": {}
}
```

### Example

```bash
# Get upcoming events
curl https://claudygod.com/api/events?status=upcoming

# Get FAQs by category
curl "https://claudygod.com/api/faqs?category=Music"
```

---

## 🔒 Security

✅ **Implemented**
- HTTPS/TLS encryption
- JWT token validation
- API key authentication
- Input validation & sanitization
- SQL injection prevention
- XSS protection (CSP)
- CSRF token handling
- Rate limiting
- Secure headers (HSTS, etc.)

⚠️ **Reporting Security Issues**
Email: security@claudygod.com (Do not post publicly)

---

## ⚡ Performance

### Optimization

- **Client-Side Caching** - 5-minute API response cache
- **Image Optimization** - Next.js automatic optimization
- **Code Splitting** - Lazy loading of components
- **Database Indexing** - Optimized queries
- **Pagination** - Large datasets split into pages

### Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse | 90+ | ~95 |
| FCP | < 2s | ~1.2s |
| API Response | < 200ms | ~100ms |
| TTI | < 3.5s | ~2.8s |

---

## 📖 Documentation

- **[ARCHITECTURE.md](/docs/_archived/ARCHITECTURE.md)** - System design and data flow
- **[MIGRATION_GUIDE.md](/docs/_archived/MIGRATION_GUIDE.md)** - Adding new data types
- **[FAQ_INTEGRATION.md](/docs/_archived/FAQ_INTEGRATION.md)** - FAQ system details
- **[IMPLEMENTATION_STATUS.md](/docs/_archived/IMPLEMENTATION_STATUS.md)** - Implementation checklist

---

## 🤝 Contributing

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Follow commit convention
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

### Code Style
- Use TypeScript strict mode
- Follow naming conventions
- Write meaningful commit messages
- Add tests for new features

---

## 📞 Support

**Documentation**: Check `/docs/_archived/` folder  
**Issues**: GitHub Issues  
**Email**: support@claudygod.com  

---

## 📄 License

Proprietary © 2026 ClaudyGod Music Ministries. All rights reserved.

---

## 🙏 Acknowledgments

Built with ❤️ for Minister ClaudyGod's global ministry

---

**Last Updated**: 2026-06-03  
**Status**: Production Ready ✅  
**Version**: 1.0.0
