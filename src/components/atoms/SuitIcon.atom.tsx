import cardSuitToImagePath from "@/helpers/cardSuitToImagePath.helper";
import React from 'react';

interface Props {
  large: boolean;
  suit: string;
  rotate: boolean;
}

const SuitIcon: React.FC<Props> = ({ large, suit, rotate }) => {
  const icon = cardSuitToImagePath(suit);
  const size = large ? '60px' : '30px';
  
  let background;
  switch(suit) {
    case "HEARTS":
    case "DIAMONDS":
      background = 'bg-redSuit';
      break;
    default:
      background = "bg-backSuit";
  }

  return (
    <div
      className={`transform ${rotate ? 'rotate-180' : ''}  bg-cover bg-center ${background} m-2`}
      style={{
        width: size,
        height: size,
        maskImage: `url(${icon})`,
        maskRepeat: 'no-repeat',
        maskSize: 'contain'
      }}
    ></div>
  );
};

export default SuitIcon;

interface Props {
  large: boolean;
  rotate: boolean;
  suit: string;
}

