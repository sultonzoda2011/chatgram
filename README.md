# ChatGram

**ChatGram** is a modern, responsive chat application built with React, Vite, and Tailwind CSS. It provides a seamless communication experience with real-time updates and a clean user interface.

## 🚀 Features

- **Authentication**: Secure Login and Registration.
- **Real-time Messaging**: Instant message delivery and updates.
- **Chat Management**: List of active chats and search for new users.
- **User Profiles**: Manage your personal information and preferences.
- **Multi-language Support**: Internationalization using `i18next`.
- **Responsive Design**: Optimized for both mobile and desktop views.
- **Dark/Light Mode**: Toggle between themes for comfortable viewing.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, Radix UI, Lucide React
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form, Zod
- **Internationalization**: i18next
- **Animations**: Motion (Framer Motion)
- **Utilities**: Axios, js-cookie, jwt-decode, clsx, tailwind-merge

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd chatgram
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:
```bash
npm run build
```

## 📂 Project Structure

- `src/api`: API integration and request handling.
- `src/components`: Reusable UI components.
- `src/i18n`: Internationalization configuration.
- `src/lib`: Shared utilities and constants.
- `src/pages`: Application pages (Auth, Main, Profile, etc.).
- `src/schemas`: Validation schemas (Zod).
- `src/types`: TypeScript type definitions.

## 📄 License

This project is licensed under the MIT License.
