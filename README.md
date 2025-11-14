# CookGPT - AI-Powered Recipe Generator

CookGPT is a modern web application that generates custom recipes using OpenAI's GPT API. Enter a food description or ingredients, and let AI create complete recipes with titles, ingredient lists, and step-by-step cooking instructions.

## Features

- 🤖 **AI Recipe Generation**: Powered by OpenAI GPT-4o-mini
- 👤 **User Authentication**: Secure login with Firebase
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 💾 **Recipe Storage**: Save and manage your generated recipes
- 🎨 **Modern UI**: Dark theme with smooth animations
- 📋 **Premade Recipes**: Sample recipes to get you started

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Firebase
- **AI**: OpenAI GPT-4o-mini
- **Authentication**: NextAuth.js
- **Database**: Firebase Firestore
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- OpenAI API key
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cook-gpt
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
CHATGPT_API_KEY=your_openai_api_key
MESSAGE_PROMPT=your_custom_prompt_prefix
# Firebase configuration variables
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Configure Firebase:
Update `firebase.ts` with your Firebase project credentials.

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Sign In**: Create an account or log in with existing credentials
2. **Generate Recipes**: Enter a food description (e.g., "Italian pasta with tomatoes and basil")
3. **View Results**: AI generates a complete recipe with ingredients and instructions
4. **Save Recipes**: Your generated recipes are automatically saved to your account
5. **Browse Premade**: Explore sample recipes for inspiration

## Project Structure

```
cook-gpt/
├── app/                    # Next.js 13+ app directory
│   ├── layout.tsx         # Root layout with authentication
│   ├── page.tsx          # Home page
│   └── recipes/           # Recipe pages
├── components/            # React components
│   ├── Login.tsx         # Authentication component
│   ├── RecipeInput.tsx   # AI recipe generation form
│   ├── RecipeItem.tsx    # Recipe display component
│   └── SideBar.tsx       # Navigation sidebar
├── lib/                   # Utilities and data
│   └── premadeRecipes.ts # Sample recipes data
├── pages/api/             # API routes
│   ├── auth/             # NextAuth configuration
│   └── generate-recipe.ts # OpenAI integration
├── stores/                # Zustand state management
├── firebase.ts            # Firebase configuration
├── memory-bank/           # Development memory system
└── styles/                # Global styles
```

## API Reference

### Generate Recipe
**POST** `/api/generate-recipe`

Generate a new recipe using AI.

**Request Body:**
```json
{
  "prompt": "Italian pasta with tomatoes and basil"
}
```

**Response:**
```json
{
  "content": "Title: Classic Spaghetti Aglio e Olio\n\nIngredients:\n- 400g spaghetti\n- 6 cloves garlic...\n\nInstructions:\n1. Cook pasta in salted water...\n..."
}
```

## License

This project is private and proprietary.

## Contact

For API rate limit issues or support: nikos@pountzas.gr
