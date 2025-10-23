# Social Support Application with AI Assistance

A React-based multi-step form wizard for government social support applications with AI-powered text generation assistance.

## How to Run the Project

### Prerequisites
- Node.js (v16 or higher)
- OpenAI API key

### Installation & Setup

```bash
git clone https://github.com/dot16461/Case-study.git
cd case-study
npm install
```

Create a `.env` file in the root directory:

```env
VITE_PUBLIC_API_KEY=your_openai_api_key_here
VITE_PUBLIC_API_URL=https://api.openai.com/v1/chat/completions
VITE_PUBLIC_API_MODEL=gpt-3.5-turbo
```

### Run Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## How to Set Up the OpenAI API Key

### Option 1: OpenAI GPT API (Recommended)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env` file:
```env
VITE_PUBLIC_API_KEY=sk-your-openai-api-key
VITE_PUBLIC_API_URL=https://api.openai.com/v1/chat/completions
VITE_PUBLIC_API_MODEL=gpt-3.5-turbo
```

### Option 2: Current Implementation (Z.AI API)

The application currently uses Z.AI API with GLM-4.6 model. To switch to OpenAI:

1. Update `src/entities/gpt/api/gpt.api.ts`:
```typescript
const url = "https://api.openai.com/v1/chat/completions";
const model = "gpt-3.5-turbo";
```

2. Update your `.env` file with OpenAI API key

## Architecture & Decisions

**Tech Stack**: React 18 + TypeScript, Material-UI, React Hook Form + Zod, Redux Toolkit, React-i18next

**Project Structure** (Feature-Sliced Design):
```
src/
├── app/                 # Application configuration
├── pages/               # Route components
├── widgets/             # Complex UI blocks (ApplicationWizard)
├── features/            # Business features (HelpMeWrite)
├── entities/            # Business entities (Application, GPT)
├── shared/              # Shared utilities and components
└── styles/              # Global styles
```

**Key Features**:
- 3-Step Form Wizard with progress persistence
- AI-powered text generation for situation descriptions
- Multi-language support (English/Arabic with RTL)
- Accessibility features (ARIA roles, keyboard navigation)
- Responsive design (mobile, tablet, desktop)

**Available Scripts**:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```
