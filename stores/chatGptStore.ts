import { create } from 'zustand';

interface ChatGptStore {
  chatGptQuestionPromt: string;
  chatGptAnswer: string;
  isLoadingData: boolean;
  chatGptError: string;
  setChatGptQuestionPromt: (prompt: string) => void;
  setChatGptAnswer: (answer: string) => void;
  setIsLoadingData: (loading: boolean) => void;
  setChatGptError: (error: string) => void;
  resetChatGpt: () => void;
}

export const useChatGptStore = create<ChatGptStore>((set) => ({
  chatGptQuestionPromt: '',
  chatGptAnswer: '',
  isLoadingData: false,
  chatGptError: '',
  setChatGptQuestionPromt: (prompt: string) => set({ chatGptQuestionPromt: prompt }),
  setChatGptAnswer: (answer: string) => set({ chatGptAnswer: answer }),
  setIsLoadingData: (loading: boolean) => set({ isLoadingData: loading }),
  setChatGptError: (error: string) => set({ chatGptError: error }),
  resetChatGpt: () => set({
    chatGptQuestionPromt: '',
    chatGptAnswer: '',
    isLoadingData: false,
    chatGptError: '',
  }),
}));

