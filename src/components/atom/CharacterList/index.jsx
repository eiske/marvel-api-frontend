import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";

import "./styles.css";

const CharacterList = ({ characters, setCharacter }) => (
  <List dense>
    {characters.map((character, i) =>
      character ? (
        <ListItem key={i} onClick={() => setCharacter(character.name)}>
          <ListItemText primary={character.name} />
        </ListItem>
      ) : null
    )}
  </List>
);

export default CharacterList;
