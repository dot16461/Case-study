# Social Support Application with AI Assistance

A modern React-based multi-step form wizard for government social support applications, featuring AI-powered text generation assistance and comprehensive accessibility support.

## 🚀 Project Overview

This application provides citizens with an intuitive, accessible way to apply for financial assistance through a 3-step form wizard. The application includes AI-powered writing assistance for complex text fields and supports both English and Arabic languages with RTL (Right-to-Left) layout.

### Key Features

- **Multi-step Form Wizard**: 3-step application process with progress tracking
- **AI Writing Assistance**: GPT-powered text generation for situation descriptions
- **Multi-language Support**: English and Arabic with RTL layout support
- **Accessibility**: ARIA roles, keyboard navigation, screen reader support
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Progress Persistence**: Local storage for saving form progress
- **Form Validation**: Comprehensive validation with Zod schemas

## 📋 Requirements Verification

### ✅ Core Requirements Met

- **3-Step Application Form**: ✅ Implemented with Personal Info, Family & Financial Info, and Situation Descriptions
- **AI Integration**: ✅ "Help Me Write" button with GPT API integration
- **Multi-language Support**: ✅ English/Arabic with RTL support
- **Accessibility**: ✅ ARIA roles, keyboard navigation, focus management
- **Responsive Design**: ✅ Mobile-first approach with Material-UI
- **Local Storage**: ✅ Progress saving and restoration
- **Form Validation**: ✅ Comprehensive validation with error handling

### ✅ Technical Stack

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) with RTL support
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Redux Toolkit
- **Internationalization**: React-i18next
- **Routing**: React Router v6
- **API Calls**: Axios with error handling
- **Styling**: SCSS with global styles

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenAI API key (or compatible AI service)

### 1. Clone and Install

```bash
git clone https://github.com/dot16461/Case-study.git
cd case-study
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_PUBLIC_API_KEY=your_openai_api_key_here
```

**Note**: The application currently uses Z.AI API (GLM-4.6 model) but can be easily configured for OpenAI GPT API.

### 3. Run the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Architecture

The project follows Feature-Sliced Design (FSD) architecture:

```
src/
├── app/                 # Application configuration and providers
├── pages/               # Route components
├── widgets/             # Complex UI blocks (ApplicationWizard)
├── features/            # Business features (HelpMeWrite)
├── entities/            # Business entities (Application, GPT)
├── shared/              # Shared utilities and components
└── styles/              # Global styles
```

### Key Components

- **ApplicationWizard**: Main multi-step form component
- **HelpMeWrite**: AI-powered text generation feature
- **LanguageManager**: Multi-language support with RTL
- **Form Components**: Reusable form fields with validation
- **Accessibility Hooks**: Focus management and screen reader support

## 🤖 AI Integration Setup

### Current Implementation

The application uses Z.AI API with the GLM-4.6 model. To switch to OpenAI:

1. Update `src/entities/gpt/api/gpt.api.ts`:
```typescript
const url = "https://api.openai.com/v1/chat/completions";
const model = "gpt-3.5-turbo";
```

2. Update your `.env` file with OpenAI API key:
```env
VITE_PUBLIC_API_KEY=sk-your-openai-api-key
```

### AI Features

- **Smart Prompts**: Context-aware text generation for financial situations
- **Error Handling**: Graceful handling of API failures and timeouts
- **User Control**: Accept, edit, or discard AI suggestions
- **Accessibility**: Screen reader announcements for AI interactions

## 🌐 Multi-language Support

### Supported Languages

- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support with proper text direction

### Language Files

- `src/shared/lib/i18n/resources/en/common.json`
- `src/shared/lib/i18n/resources/ar/common.json`

### Adding New Languages

1. Create new language file in `resources/[lang]/common.json`
2. Update `APP_CONFIG.supportedLanguages` in `app.config.ts`
3. Add language option to `LanguageSwitcher` component

## ♿ Accessibility Features

### Implemented Accessibility Features

- **ARIA Roles**: Proper semantic markup for form elements
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Automatic focus handling between steps
- **Screen Reader Support**: Announcements for form state changes
- **High Contrast**: Material-UI theme with accessibility considerations
- **Form Labels**: Proper labeling for all form inputs

### Testing Accessibility

- Use screen readers (NVDA, JAWS, VoiceOver)
- Test keyboard-only navigation
- Verify color contrast ratios
- Check ARIA attributes with browser dev tools

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 960px  
- **Desktop**: > 960px

### Mobile Optimizations

- Touch-friendly button sizes
- Optimized form layouts
- Swipe gestures for step navigation
- Mobile-specific validation messages

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting (if configured)
- **Prettier**: Code formatting (if configured)

### File Structure

- **Components**: PascalCase with `.tsx` extension
- **Hooks**: camelCase with `use` prefix
- **Types**: PascalCase with `.types.ts` extension
- **Utils**: camelCase with descriptive names

## 🚀 Deployment

### Build Process

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables

Ensure the following environment variables are set in production:

- `VITE_PUBLIC_API_KEY`: Your AI API key


## 📝 API Integration

### Mock API

The application includes a mock API (`src/shared/api/mockApi.ts`) for development and testing. Replace with real API endpoints for production.

### Form Submission

The application submits form data to a mock endpoint. Update the submission logic in `ApplicationSubmission` component for production use.

## 🔒 Security Considerations

- API keys are stored in environment variables
- Form data validation prevents malicious input
- No sensitive data is logged to console
- HTTPS should be used in production

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [React-i18next](https://react.i18next.com/)

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Ensure all new features include proper TypeScript types
3. Add accessibility features for new UI components
4. Update language files for any new text content
5. Test on multiple devices and screen readers

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
