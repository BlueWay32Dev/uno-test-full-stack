import React from "react";
import { Card as CardType } from "../types";

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

export const Card: React.FC<CardProps> = React.memo(({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative aspect-square rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
        disabled || card.isMatched ? "cursor-not-allowed" : ""
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-white text-4xl font-bold">?</div>
        </div>
        <div
          className={`absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden ${
            card.isMatched ? "opacity-50" : ""
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <img
            src={card.imageUrl}
            alt="Carta"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';
