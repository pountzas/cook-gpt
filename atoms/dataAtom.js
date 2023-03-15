import { atom } from 'recoil';

export const chatGptQuestionPromtAtom = atom({
  key: 'chatGptQuestionPromtAtom',
  default: '',
});

export const chatGptAnswerAtom = atom({
  key: 'chatGptAnswerAtom',
  default: '',
});

export const isLoadingDataAtom = atom({
  key: 'isLoadingDataAtom',
  default: false,
});

export const mainTitleAtom = atom({
  key: 'mainTitleAtom',
  default: 'Recipe Generator',
});

export const premadeIngredientsAtom = atom({
  key: 'premadeIngredientsAtom',
  default: [],
});

export const premadeInstructionsAtom = atom({
  key: 'premadeInstructionsAtom',
  default: [],
});

export const chatGptErrorAtom = atom({
  key: 'chatGptErrorAtom',
  default: '',
});