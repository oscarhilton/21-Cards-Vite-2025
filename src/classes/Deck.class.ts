import api from "@/services/api.service";
import Card from "@/classes/Card.class";
import cardValueToNumericValue from "@/helpers/cardValueToNumericValue.helper";

/**
 * Deck handles communication with the deck API and provides
 * utilities for working with card game logic.
 */
export default class Deck {

  /**
   * Requests a new shuffled deck from the API.
   * @param deckCount - Number of decks to include (usually 1).
   * @returns The unique deck ID to be used in future draws.
   */
  static async brandNewDeck(deckCount: number): Promise<string> {
    const response = await api.getNewDeck(deckCount);
    return response.deck_id;
  }

  /**
   * Draws a single card from the provided deck.
   * Converts the API card shape into a `Card` instance.
   * @param deckId - The ID of the deck to draw from.
   * @returns A `Card` instance representing the drawn card.
   */
  static async drawACard(deckId: string): Promise<Card> {
    const response = await api.drawACard(deckId);
    const card = response.cards?.[0];

    if (!card) throw new Error("No card returned from draw");

    const numericValue = cardValueToNumericValue(card.value);
    return new Card(card.value, numericValue, card.suit);
  }

  /**
   * Calculates the total numeric value of a hand of cards.
   * @param gameCards - Array of Card instances.
   * @returns The sum of their `value` properties.
   */
  static fetchTotal(gameCards: Card[]): number {
    if (gameCards.length === 0) return 0;
    return gameCards.reduce((total, currentCard) => {
      return total + currentCard.value;
    }, 0);
  }

  /**
   * Counts how many cards have been drawn.
   * @param gameCards - Array of Card instances.
   * @returns The number of cards.
   */
  static getNumberOfCardsDrawn(gameCards: Card[]): number {
    return gameCards.length;
  }
}
