import { createContext, useContext } from "react";

export interface Deck {
  name: string;
  colors: string;
}

export interface Game {
  deck: string;
  numPlayers: number;
  won: boolean;
}

export interface PlaySession {
  date: string;
  games: Game[];
}

export interface PlayLogContext {
  decks: Record<string, Deck>;
  log: PlaySession[];
  addDeck: (name: string, colors: string) => void;
  addLogEntry: (
    deckName: string,
    date: string,
    numPlayers: number,
    won: boolean
  ) => void;
}

export const playLogContext = createContext<PlayLogContext>({
  decks: {},
  log: [],
  addDeck: () => {},
  addLogEntry: () => {},
});

export const usePlayLogContext = () => useContext(playLogContext);
