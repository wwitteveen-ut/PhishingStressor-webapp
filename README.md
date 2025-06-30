# Phishing Stressor Web Application

A Next.js-based web application for conducting and managing phishing research experiments in a controlled environment. This platform enables researchers to create experiments, compose emails, manage participants, and track engagement metrics.

## Features

### Researcher Features

- **Experiment Management**
  - Create and manage research experiments
  - Define experiment duration and participant groups
  - Add/remove researchers from experiments
  - Generate participant credentials

- **Email Management**
  - Compose and schedule emails
  - Rich text editor with formatting options
  - File attachment support
  - Email scheduling based on participant login time
  - Email timeline visualization

- **Analytics & Tracking**
  - Track email open rates
  - Monitor link clicks and attachment interactions
  - View participant responses and engagement
  - Analyze phishing attempt success rates
  - Visual heatmaps for email interactions

### Participant Features

- **Email Interface**
  - Realistic email client interface
  - Email viewing and responding capabilities
  - Attachment handling

## Development Setup

1. Copy `.env.example` to `.env` and fill in the required environment variables.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. To build the project for production:
   ```bash
   npm run build
   ```

5. To start the production server after building:
   ```bash
   npm start
   ```

## Technology Stack

- **Frontend Framework**: Next.js (with TypeScript)
- **UI Components**: Mantine UI
- **Rich Text Editing**: TipTap
- **State Management**: Zustand
- **Authentication**: Auth.js
- **API Mocking**: MSW (Mock Service Worker)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── auth/                   # Authentication logic and components
├── mail/                   # Email client implementation
│   ├── actions/           # Email-related server actions
│   ├── components/        # Email UI components
│   ├── store/             # Email state management
│   └── utils/             # Email-related utilities
├── researcher/            # Researcher dashboard implementation
│   ├── actions/           # Researcher server actions
│   ├── components/        # Researcher UI components
│   └── store/             # Researcher state management
├── shared/                # Shared utilities and components
└── mocks/                 # Mock data and API handlers
```



6. Open [http://localhost:3000](http://localhost:3000) in your browser

