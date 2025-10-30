import { create } from 'zustand';

interface ChatGptStore {
  chatGptQuestionPrompt: string;
  chatGptAnswer: string;
  isLoadingData: boolean;
  chatGptError: string;
  setChatGptQuestionPrompt: (prompt: string) => void;
  setChatGptAnswer: (answer: string) => void;
  setIsLoadingData: (loading: boolean) => void;
  setChatGptError: (error: string) => void;
  resetChatGpt: () => void;
}

export const useChatGptStore = create<ChatGptStore>((set) => ({
  chatGptQuestionPrompt: '',
  chatGptAnswer: '',
  isLoadingData: false,
  chatGptError: '',
  setChatGptQuestionPrompt: (prompt: string) => set({ chatGptQuestionPrompt: prompt }),
  setChatGptAnswer: (answer: string) => set({ chatGptAnswer: answer }),
  setIsLoadingData: (loading: boolean) => set({ isLoadingData: loading }),
  setChatGptError: (error: string) => set({ chatGptError: error }),
  resetChatGpt: () => set({
    chatGptQuestionPrompt: '',
    chatGptAnswer: '',
    isLoadingData: false,
    chatGptError: '',
  }),
}));

