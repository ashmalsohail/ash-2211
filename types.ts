export enum AnimalType {
  CAT = 'Cat',
  DOG = 'Dog',
  FOX = 'Fox',
  RABBIT = 'Rabbit',
  PANDA = 'Panda',
  DRAGON = 'Dragon'
}

export interface AnimalConfig {
  type: AnimalType;
  emoji: string;
  color: string;
  borderColor: string;
  prompt: string;
}

export interface ThoughtBubble {
  id: string;
  text: string;
}
