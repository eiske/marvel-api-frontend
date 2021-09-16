import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_MARVEL_CHARACTER,
  FETCH_CHARACTER,
  EDIT_CHARACTER,
} from "../types";

const initialState = {
  characters: [],
  singleCharacter: [],
  isLoading: false,
  error: null,
};

const marvelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_START:
      return { ...state, isLoading: true };

    case FETCH_ERROR:
      return { ...state, isLoading: false };

    case FETCH_MARVEL_CHARACTER:
      return { ...state, isLoading: false, characters: payload };

    case FETCH_CHARACTER:
      return {
        ...state,
        isLoading: false,
        singleCharacter: payload,
      };

    case EDIT_CHARACTER:
      const id = payload.index;
      const updatedCharacters = state.characters.map((character) => {
        if (character.id !== parseInt(id, 10)) return character;
        return {
          ...character,
          name: payload.name,
          description: payload.description,
        };
      });
      return {
        ...state,
        isLoading: false,
        characters: updatedCharacters,
      };

    default:
      return state;
  }
};
export default marvelReducer;
