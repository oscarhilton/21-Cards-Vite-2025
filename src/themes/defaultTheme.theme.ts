import COLOURS from "./colours";
import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  gameArea: COLOURS.black_dark,
  gameButton: COLOURS.black_light,
  cardColour: COLOURS.white_light,
  cardEdge: COLOURS.blue_light,
  gameStateText: COLOURS.blue_light,
  gameScoreText: COLOURS.black_light,
  suits: {
    clubs: COLOURS.orangeRed_mid,
    spades: COLOURS.orangeRed_mid,
    diamonds: COLOURS.green_dark,
    hearts: COLOURS.green_dark,
  }
};

export default defaultTheme;
