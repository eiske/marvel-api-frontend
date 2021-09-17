import React from "react";
import { TextField } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const SearchBar = ({ input, setKeyword, clear }) => (
  <TextField
    id="search-bar"
    value={input}
    placeholder="Edit character"
    onChange={(event) => setKeyword(event.target.value)}
    variant="outlined"
    InputProps={{
      endAdornment: (
        <ClearRoundedIcon style={{ cursor: "pointer" }} onClick={clear} />
      ),
    }}
  />
);

export default SearchBar;
