const BASE_URL = "https://deckofcardsapi.com/api/deck/";

export default class Api {
  private static async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(BASE_URL + url);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const json = await response.json();

    if (!json?.success) {
      throw new Error("API responded without success flag");
    }

    return json as T;
  }

  static getNewDeck(deckCount: number = 1): Promise<NewDeckResponse> {
    return this.fetchJson<NewDeckResponse>(`new/shuffle/?deck_count=${deckCount}`);
  }

  static drawACard(deckId: string, amountOfCards: number = 1): Promise<NewCardResponse> {
    return this.fetchJson<NewCardResponse>(`${deckId}/draw/?count=${amountOfCards}`);
  }
}


// API Response shapes:

export interface CardObject {
  suit: "HEARTS" | "DIAMONDS" | "CLUBS" | "SPADES";
  value: string; // Optionally: use a union of known values
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
}

export interface NewDeckResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
}

export interface NewCardResponse {
  success: boolean;
  deck_id: string;
  remaining: number;
  cards: CardObject[];
}





