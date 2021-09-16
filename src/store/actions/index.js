import axios from "axios";
import md5 from "md5";

import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_MARVEL_CHARACTER,
  FETCH_CHARACTER,
  EDIT_CHARACTER,
} from "../types";

const ts = Number(new Date());
const baseUrl = "https://gateway.marvel.com";
const publicKey = "950610a07d645e102e76a039a042007e";
const privateKey = "782f4183080e5c5d53087bb698d212346e4e5289";
const hash = md5(ts + privateKey + publicKey);

export const fetchMarvelCharacter = (offset, limit = 24) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_START });

    const response = await axios.get(
      `${baseUrl}/v1/public/characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    if (response.status === 200) {
      dispatch({
        type: FETCH_MARVEL_CHARACTER,
        payload: response.data.data.results,
      });
    } else {
      dispatch({ type: FETCH_ERROR });

      console.log(
        "Check your request if don't have any problems, you can consult documentation on https://developer.marvel.com/docs"
      );
    }
  };
};

export const fetchCharacter = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_START });

    const response = await axios.get(
      `${baseUrl}/v1/public/characters/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    if (response.status === 200) {
      dispatch({
        type: FETCH_CHARACTER,
        payload: response.data.data.results,
      });
    } else {
      dispatch({ type: FETCH_ERROR });

      console.log(
        "Check your request if don't have any problems, you can consult documentation on https://developer.marvel.com/docs"
      );
    }
  };
};

export const editCharacter = (value) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    dispatch({ type: EDIT_CHARACTER, payload: value });
  };
};
