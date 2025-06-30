# User Tracking and Lead Association Implementation

## Overview

This implementation provides a comprehensive solution for tracking chatbot users and associating their conversations with leads in the Travel Insurance Lead Machine application.

## Key Features

### 1. **Session Management** (`src/utils/session.ts`)
- Automatically generates unique session IDs for all visitors
- Persists session data in localStorage
- Tracks both anonymous users and identified leads

### 2. **Lead Association**
- When a user submits the quote form, their lead UUID is stored
- All subsequent chat messages are associated with their lead UUID
- Pre-conversion chats can be linked to post-conversion leads

### 3. **Dual Tracking System**
The system tracks users in two ways:
- **Session ID**: Generated for every visitor (anonymous tracking)
- **Lead UUID**: Assigned when a user submits the quote form (identified tracking)

## Implementation Details

### Session Utility Methods

```typescript
UserSession.getOrCreateSessionId() // Get or create session ID
UserSession.getCurrentLeadUuid()    // Get current lead UUID if exists
UserSession.getTrackingId()         // Get best available tracking ID
```

### Chat Tracking Flow

1. **Anonymous User**:
   - Session ID is generated on first visit
   - Chat messages are logged with `tracking_type: 'session'`

2. **After Lead Submission**:
   - Lead UUID is stored in localStorage
   - Chat messages are logged with `tracking_type: 'lead'`
   - Previous session can be linked to the new lead

### Google Sheets Schema

The updated chat_logs sheet includes:
- `timestamp`: When the message was sent
- `question`: User's message
- `answer`: Bot's response
- `tracking_id`: Either session ID or lead UUID
- `tracking_type`: 'session' or 'lead'
- `lead_uuid`: Populated only for identified leads

## Benefits

1. **Complete User Journey Tracking**: Track users from first visit through conversion
2. **Lead Attribution**: Associate all interactions with specific leads
3. **Analytics Ready**: Analyze conversion rates and user behavior
4. **Privacy Compliant**: Anonymous tracking until user provides information

## Usage

The tracking is automatic and requires no additional configuration. The system will:
- Generate session IDs for all new visitors
- Switch to lead tracking after form submission
- Maintain tracking across page refreshes
- Log all chat interactions with appropriate identifiers

## Future Enhancements

1. **Session Merging**: Link pre-conversion sessions to post-conversion leads
2. **Multi-Device Tracking**: Track users across devices
3. **Advanced Analytics**: Build dashboards for user behavior analysis
4. **Data Export**: Export tracking data for CRM integration 