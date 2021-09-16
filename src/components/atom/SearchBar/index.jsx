import React from "react";
import { TextField } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const SearchBar = ({ keyword, setKeyword }) => (
  <TextField
    id="search-bar"
    value={keyword}
    placeholder="Edit character"
    onChange={(event) => setKeyword(event.target.value)}
    variant="outlined"
    InputProps={{
      endAdornment: <ClearRoundedIcon onClick={() => setKeyword("")} />,
    }}
  />
);

export default SearchBar;
