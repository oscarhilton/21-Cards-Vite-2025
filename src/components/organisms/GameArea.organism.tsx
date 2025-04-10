import { useEffect, useMemo } from 'react';
import GameButton from '@/components/atoms/GameButton.atom';
import Card from "@/components/molecules/Card.molecule";
import useDeck, { GAME_STATES } from "@/hooks/useDeck.hook";

const WINNING_STRING = "You won!";
const LOSING_STRING = "You went bust!";

// COMPONENT
export default function GameArea() {
  const {
    startGame,
    drawnCards,
    total,
    score,
    highScore,
    gameState,
    drawNewCard,
  } = useDeck();

  useEffect(() => {
    startGame(); // Automatically start the game when component is mounted
  }, [startGame]);

  // Memoize the game state message to avoid unnecessary recomputations
  const displayGameState = useMemo(() => {
    switch (gameState) {
      case GAME_STATES.WINNER:
        return WINNING_STRING;
      case GAME_STATES.BUST:
        return LOSING_STRING;
      default:
        return '';
    }
  }, [gameState]);

  // Memoize the game button to prevent unnecessary re-renders
  const displayGameButton = useMemo(() => {
    switch (gameState) {
      case GAME_STATES.WINNER:
        return <GameButton onClick={startGame} buttonText="Play again?" />;
      case GAME_STATES.BUST:
        return <GameButton onClick={startGame} buttonText="Try again?" />;
      default:
        return <GameButton onClick={drawNewCard} buttonText={`Draw ${score > 0 ? 'another ' : ''}card`} />;
    }
  }, [gameState, startGame, drawNewCard, score]);

  return ( // Game currently at play!
    <div className="min-h-screen relative">
      <div className="text-right p-8">
        High Score: {highScore}
      </div>

      <div className="relative w-full h-[600px] bg-gameArea overflow-hidden">
        {/* Total score */}
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-10 opacity-80 text-gameScoreText text-[30vh]">
          {total}
        </div>

        {/* Display game state message (Winner, Bust, etc.) */}
        {gameState !== GAME_STATES.PLAYING && (
          <div 
            className="absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center z-10 opacity-100 text-5xl text-gameStateText"
            style={{ backgroundColor: `rgba(0, 0, 0, 0.4)`}}
          >
            {displayGameState}
          </div>
        )}

        {/* Display drawn cards */}
        {drawnCards.map(({ id, name, suit, startingRotation, endingRotation }) => (
          <div key={id} className="absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center">
            <Card name={name} suit={suit} startingRotation={startingRotation} endingRotation={endingRotation} />
          </div>
        ))}
      </div>

      <div className="text-center py-8">
        Current Score: {score}
      </div>

      <div className="text-center mb-5">
        {displayGameButton}
      </div>
    </div>
  );
}
