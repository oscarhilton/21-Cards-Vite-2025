# Running this application

###### Stable node version

`14.0+`
###### Development mode

`yarn start`

###### Production mode

`yarn build`

###### Environment variables

`N/A` (none)

# Testing plan

## API
*Mocking axios and requiring our services*

```
const apiService = require('services/api.service');
const axios = require('axios');`

jest.mock('axios');
```

*Checking the application works as intented with expected payload.*

1. Get a standard API response for endpoint from the documentation
2. Feed the response into the `mockResolvedValue`
3. Test against result (Updates state?)

```
const MOCKED_CARD_RESPONSE = . . . . . .;

it('returns a new card from the deck', async () => {
  axios.get.mockResolvedValue({
    data: {
      . . . . 
      // the data appropriate to use as a fixture
    }
  });

  const newCardFromDeck = await apiService.drawACard();
  expect(newCardFromDeck).toEqual(MOCKED_CARD_RESPONSE);
});
```

*Checking the application gracefully handles an error response*

1. Get the returned error(s) from the documentation
2. Feed error(s) into test
3. Test against result (fires a function? Updates state? Tries again?)

```
const MOCKED_CARD_ERROR_RESPONSE = . . . . . .;
const MOCKED_RETURN = . . . . . ;

it('returns a new card from the deck', async () => {
  axios.get.mockResolvedValue(MOCKED_CARD_ERROR_RESPONSE);

  const newCardFromDeck = await apiService.drawACard();
  expect(newCardFromDeck).toEqual(MOCKED_RETURN);
});
```


*Checking debouncing / server load / etc.*

1. Make sure for every single request made a single response is given

```
expect(axios.get).toHaveBeenCalledTimes(1);
```

## Game rules
Looking at the rules of the game I can pick out some good unit tests that could potentially be written:

> Add one card at a time from a deck to the board.

######Criteria

1. One card at a time must be drawn
2. Singular deck must be used
3. Card must be rendered to the board

######Tests

1. Mock the return of the API service to something we expect to see based on the API documentation.
2. Import the 'Deck' class to the test and run `Deck.drawACard(X)` function passing in a constant variabale as `X`. The result should return a single `Card` class.
3. Using the methods from `react-testing-library` 

```
import { render, fireEvent, getByTestId } from "react-testing-library";
```

- Render the component
- Fire a click event on the game button
- Use getByTestId to get the `<CardContainer>`
- Check the number of children expecting the number to have gone up by one.

> If the total sums to 21 then you win; if you go over 21 you go bust!

######Criteria

1. Test the function that returns the sum of the cards dealt
2. Test the game's state change once a score reaches 21
3. Test the game's state change once a score passes 21

######Tests

1. Test the function that gives the value to the cards (`helpers/cardValueToNumericValue.helper.ts`). Test this function against all possible cards and their expected values using `expect()` and `.toBe()`
2. Import `Deck` class and use the `.fetchTotal()` function. Make an array variable containing all the cards possible in the deck using the `.drawACard()` function first mocking the axios API response.
3. Mock an array of drawn cards totalling 21; check score with `.getByText` and `Expect` it to be the length of the array. Check that the game state returns `WINNING_STRING`
4. Mock an array of drawn cards totalling over 21; check the game state returns `LOSING_STRING`


> number of cards on the table is recorded as your high score.

######Criteria 

1. Check the highscore variable change

######Tests

1. Mock a winning hand with 5 cards
2. Expect highscore DOM `.getByText` to equal 5

> All face cards have a score of 10. Ace is 11. (Number cards have a score of said number).

######Criteria

* Use the helper function to test deck

######Tests

1. Import `cardValueToNumericValue.helper.ts`
2. Using `expect` compare the value returned from the helper function with a function that checks for that value.

```
//               A   K   Q   J   
const suitSum = [11, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].reduce((total, current) => total + current, 0);
const suits = 4;
const toCompare = suitSum * suits;
```
*There are better ways of getting this sum! (but this is clear for testing)*

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# 21-Cards-Vite-2025
