import { useState, useMemo, useCallback, useEffect } from "react";
import Deck from "@/classes/Deck.class";
import Card from "@/classes/Card.class";

const TARGET = 21;

export const GAME_STATES = {
  IDLE: "idle",
  PLAYING: "playing",
  BUST: "bust",
  WINNER: "winner",
} as const;

type GameState = typeof GAME_STATES[keyof typeof GAME_STATES];

export default function useDeck() {
  const [deck, setDeck] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [highScore, setHighScore] = useState<number>(0);

  const fetchNewDeck = useCallback(async (deckCount: number) => {
    const newDeck = await Deck.brandNewDeck(deckCount);
    setDeck(newDeck);
  }, []);

  const drawNewCard = useCallback(async () => {
    if (!deck) return;
    const newCard = await Deck.drawACard(deck);
    setDrawnCards(prev => [...prev, newCard]);
  }, [deck]);

  const total = useMemo(() => Deck.fetchTotal(drawnCards), [drawnCards]);
  const score = useMemo(() => Deck.getNumberOfCardsDrawn(drawnCards), [drawnCards]);

  const gameState: GameState = useMemo(() => {
    if (total === TARGET) return GAME_STATES.WINNER;
    if (total > TARGET) return GAME_STATES.BUST;
    return GAME_STATES.PLAYING;
  }, [total]);

  useEffect(() => {
    if (gameState === GAME_STATES.WINNER && score > highScore) {
      setHighScore(score);
    }
  }, [gameState, score, highScore]);

  const startGame = useCallback(() => {
    setDrawnCards([]);
    fetchNewDeck(1);
  }, [fetchNewDeck]);

  return {
    startGame,
    drawnCards,
    total,
    score,
    highScore,
    gameState,
    drawNewCard,
  };
}
