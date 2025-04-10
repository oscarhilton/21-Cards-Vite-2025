import SuitIcon from "@/components/atoms/SuitIcon.atom";
import { motion } from 'framer-motion';

export default function Card(props: CardProps) {
  const { name, suit, startingRotation, endingRotation } = props;

  const isNumberCard = !isNaN(parseInt(name.charAt(0), 10));
  const cardSymbol = getCardSymbol(name, isNumberCard);
  const numberOfSymbols = isNumberCard ? parseInt(cardSymbol, 10) : 1;

  return (
    <motion.div
      initial={{
        scale: 3,
        rotate: startingRotation,
        x: '100%',
        y: '100%',
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)',
      }}
      animate={{
        scale: 1,
        rotate: endingRotation,
        x: 0,
        y: 0,
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.2)',
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="w-48 h-72 bg-cardColour m-1 p-2 rounded-lg flex-shrink-0 relative flex items-center justify-center border-4 border-cardEdge"
    >
      <div className="absolute text-xl font-bold font-mono text-gray-400 top-2 left-2">
        {cardSymbol}
      </div>

      <div className="w-4/5 h-4/5 mx-auto flex flex-wrap items-center justify-around">
        {Array.from({ length: numberOfSymbols }).map((_, index) => (
          <SuitIcon
            key={`${suit}-${index}`}
            suit={suit}
            large={!isNumberCard}
            rotate={shouldRotate(index, numberOfSymbols)}
          />
        ))}
      </div>

      <div className="absolute text-xl font-bold text-gray-400 bottom-2 right-2 transform rotate-180">
        {cardSymbol}
      </div>
    </motion.div>
  );
}

// Helper functions
function getCardSymbol(cardValue: string, isNumber: boolean): string {
  return isNumber ? cardValue : cardValue.charAt(0);
}

function shouldRotate(index: number, total: number): boolean {
  return index > 3 && index + 1 > total / 2;
}

// Props
interface CardProps {
  name: string;
  suit: string;
  startingRotation: number;
  endingRotation: number;
}
