export default class Card {
  // Unique identifier for this card instance (randomly generated)
  public id: string;

  // Name of the card, e.g. "10", "K", "A"
  public name: string;

  // Numeric value used for scoring, e.g. 10 for "K", 1 for "A"
  public value: number;

  // Suit of the card: "HEARTS", "SPADES", etc.
  public suit: string;

  // Randomized rotation at the start of the animation
  public startingRotation: number;

  // Rotation value at the end of the animation
  public endingRotation: number;

  constructor(name: string, value: number, suit: string) {
    this.id = this.createId(); // Generate unique ID for React key or tracking
    this.name = name;
    this.value = value;
    this.suit = suit;
    this.startingRotation = this.getRandomInRange(0, 10); // Adds slight spin
    this.endingRotation = this.startingRotation - this.getRandomInRange(0, 30); // Reverse spin
  }

  /**
   * Generates a short random ID string, prefixed with "_"
   * Used for uniquely identifying card instances.
   */
  private createId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Returns a random float between `min` and `max`.
   * Used to add variation to card animation.
   */
  private getRandomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
