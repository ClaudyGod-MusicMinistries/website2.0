# 🔒 ClaudyGod Security Architecture

## Overview

This document describes the security measures implemented to protect the ClaudyGod application and prevent unauthorized access to backend routes and sensitive resources.

---

## 🔐 Authentication Methods

### 1. **API Key Authentication**

**Purpose**: Authenticate public API endpoints (no user session required)

**Usage**:
```bash
curl -X GET https://claudygod.org/api/media/videos \
  -H "x-api-key: YOUR_API_KEY_HERE"
```

**Configuration**:
```env
VALID_API_KEYS=key1_xxxxx,key2_xxxxx,key3_xxxxx
INTERNAL_API_KEY=internal_key_xxxxx
```

**Key Points**:
- Required for public endpoints
- Include in `x-api-key` header
- Rotate keys regularly
- Different key per service/client
- Never expose in client-side code

---

### 2. **JWT Token Authentication**

**Purpose**: Authenticate authenticated users and admin-only endpoints

**Usage**:
```bash
curl -X POST https://claudygod.org/api/media/videos \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Flow**:
1. User logs in and receives JWT token
2. Frontend stores token securely (HttpOnly cookie or secure storage)
3. Include token in `Authorization: Bearer <token>` header
4. Backend validates and checks user roles/permissions

**Configuration**:
```env
JWT_SECRET=your_secret_xxxxx
JWT_EXPIRY=7d
```

---

## 🎬 YouTube Link Protection

### Secure Video Embed

Instead of exposing direct YouTube links, use the secure proxy:

**Frontend Usage**:
```typescript
import { SecureYoutubeVideo } from '@/components/media/SecureYoutubeVideo';

export function VideoPage() {
  return (
    <SecureYoutubeVideo
      videoId="dQw4w9WgXcQ"
      title="My Video"
      width={560}
      height={315}
      autoplay={false}
    />
  );
}
```

**API Endpoint**:
```
POST /api/media/youtube/[videoId]
GET /api/media/youtube/[videoId]
```

**Benefits**:
- ✅ Direct YouTube links not exposed
- ✅ Uses `youtube-nocookie.com` domain
- ✅ Requires API key authentication
- ✅ Prevents related video suggestions
- ✅ Cached for 24 hours (privacy-friendly)

---

## 🛡️ Protected Endpoints

### Public Endpoints (Require API Key)

```
GET    /api/media/videos           (List public videos)
POST   /api/media/youtube/[id]     (Get video embed URL)
GET    /api/media/youtube/[id]     (Cached video URL)
POST   /api/bookings               (Create booking)
POST   /api/contacts               (Submit contact form)
POST   /api/volunteers             (Volunteer application)
POST   /api/payments/initialize    (Initialize payment)
```

**Example**:
```typescript
// Frontend
const response = await fetch('/api/media/videos', {
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
  }
});
```

### Admin Endpoints (Require JWT Token)

```
POST   /api/media/videos           (Create video)
PUT    /api/media/videos/[id]      (Update video)
DELETE /api/media/videos/[id]      (Delete video)
```

**Example**:
```typescript
// Frontend (authenticated user)
const response = await fetch('/api/media/videos', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`
  },
  body: JSON.stringify({ title: '...', videoId: '...' })
});
```

---

## 🔧 Configuration

### Generate Secure Keys

```bash
# Generate API Key
openssl rand -hex 32

# Generate JWT Secret
openssl rand -hex 32

# Output example:
# 3a7f8c2b9e4d1a6f5c8b9d2e7a4f1c6b
```

### Environment Setup

1. **Create `.env.local`** (development):
```env
API_BASE_URL=http://localhost:8080
VALID_API_KEYS=dev_key_xxxxx,test_key_xxxxx
INTERNAL_API_KEY=dev_internal_xxxxx
JWT_SECRET=dev_secret_xxxxx
```

2. **Set in production**:
```bash
# Via deployment system (Docker, Kubernetes, etc.)
VALID_API_KEYS="prod_key_xxxxx,prod_key2_xxxxx"
INTERNAL_API_KEY="prod_internal_xxxxx"
JWT_SECRET="prod_secret_xxxxx"
```

3. **Verify configuration**:
```bash
# Check that secrets are set
echo $VALID_API_KEYS
echo $INTERNAL_API_KEY
echo $JWT_SECRET
```

---

## 🚀 Best Practices

### For Developers

1. **Never commit secrets**:
   ```bash
   # ❌ BAD
   export VALID_API_KEYS="key_12345"
   
   # ✅ GOOD
   # Store in .env.local (gitignored)
   ```

2. **Use environment variables for all keys**:
   ```typescript
   // ❌ BAD - Hardcoded
   const apiKey = 'key_hardcoded_12345';
   
   // ✅ GOOD - From environment
   const apiKey = process.env.NEXT_PUBLIC_API_KEY;
   ```

3. **Validate all inputs**:
   ```typescript
   // ✅ Validate video ID format
   if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
     throw new Error('Invalid video ID');
   }
   ```

4. **Log security events**:
   ```typescript
   console.log(`[security] Failed auth attempt: ${error}`);
   ```

### For DevOps

1. **Rotate keys regularly** (every 90 days)
2. **Use separate keys per environment** (dev, staging, prod)
3. **Monitor failed authentication attempts**
4. **Enable request logging** for audit trail
5. **Use HTTPS only** in production
6. **Set secure headers** (CSP, X-Frame-Options, etc.)

### For Security

1. **API Keys**:
   - ✅ Short-lived (prefer tokens)
   - ✅ Scoped to specific endpoints
   - ✅ Rotated regularly
   - ✅ Monitored for suspicious activity

2. **JWT Tokens**:
   - ✅ Signed with strong secret
   - ✅ Include expiration (`exp` claim)
   - ✅ Stored securely (HttpOnly cookies)
   - ✅ Validated on every request

3. **Sensitive Data**:
   - ✅ Never log passwords or tokens
   - ✅ Use encryption for data at rest
   - ✅ Use HTTPS for data in transit
   - ✅ Mask personal info in logs

---

## 🧪 Testing

### Test API Key Authentication

```bash
# Without API key - should fail
curl https://claudygod.org/api/media/videos

# With valid API key - should succeed
curl https://claudygod.org/api/media/videos \
  -H "x-api-key: your_api_key"

# With invalid API key - should fail
curl https://claudygod.org/api/media/videos \
  -H "x-api-key: invalid_key"
```

### Test YouTube Proxy

```bash
# Get secure embed URL
curl -X POST https://claudygod.org/api/media/youtube/dQw4w9WgXcQ \
  -H "x-api-key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"autoplay": false}'

# Response should contain youtube-nocookie.com URL
# {
#   "success": true,
#   "data": {
#     "videoId": "dQw4w9WgXcQ",
#     "embedUrl": "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?...",
#     "provider": "youtube-nocookie"
#   }
# }
```

---

## 📚 Resources

- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [API Key Management](https://cheatsheetseries.owasp.org/cheatsheets/API_Key_Cheat_Sheet.html)
- [YouTube-nocookie Domain](https://support.google.com/youtube/answer/171780)

---

## 📞 Support

For security issues:
1. **DO NOT** create public GitHub issues
2. Email security concerns to: peter4tech@gmail.com
3. Provide detailed reproduction steps
4. Allow 48 hours for response

---

**Last Updated**: 2026-06-03  
**Security Level**: ⭐⭐⭐⭐⭐ (Production Ready)
