export default function cardValueToNumericValue(cardName: string): number {
  if (!cardName) throw new Error("Invalid cardname entered to funcuton");
  switch (cardName) {
    case "ACE": return 11;
    case "KING":
    case "QUEEN":
    case "JACK": return 10;
    default: return parseInt(cardName, 10);
  }
}