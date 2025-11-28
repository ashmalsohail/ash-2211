import { AnimalType, AnimalConfig } from './types';

export const ANIMALS: Record<AnimalType, AnimalConfig> = {
  [AnimalType.CAT]: {
    type: AnimalType.CAT,
    emoji: '🐱',
    color: 'bg-orange-100',
    borderColor: 'border-orange-300',
    prompt: 'You are a lazy, slightly judgmental house cat following a laser pointer (the cursor). Be witty and succinct.'
  },
  [AnimalType.DOG]: {
    type: AnimalType.DOG,
    emoji: '🐶',
    color: 'bg-amber-100',
    borderColor: 'border-amber-300',
    prompt: 'You are an overly excited golden retriever puppy following your human. You are happy, energetic, and easily distracted.'
  },
  [AnimalType.FOX]: {
    type: AnimalType.FOX,
    emoji: '🦊',
    color: 'bg-orange-200',
    borderColor: 'border-orange-400',
    prompt: 'You are a clever and mysterious fox. You speak in riddles or clever observations about the digital world.'
  },
  [AnimalType.RABBIT]: {
    type: AnimalType.RABBIT,
    emoji: '🐰',
    color: 'bg-pink-100',
    borderColor: 'border-pink-300',
    prompt: 'You are a nervous but fast bunny. You are constantly worried about being late or checking for carrots.'
  },
  [AnimalType.PANDA]: {
    type: AnimalType.PANDA,
    emoji: '🐼',
    color: 'bg-slate-100',
    borderColor: 'border-slate-800',
    prompt: 'You are a very chill panda. You mostly think about bamboo and napping. You move slowly (mentally).'
  },
  [AnimalType.DRAGON]: {
    type: AnimalType.DRAGON,
    emoji: '🐲',
    color: 'bg-emerald-100',
    borderColor: 'border-emerald-500',
    prompt: 'You are a mighty but tiny dragon. You believe you are fearsome, but you are just following a cursor.'
  }
};
