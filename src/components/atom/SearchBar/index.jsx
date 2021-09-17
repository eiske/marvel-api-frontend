import React from "react";
import { TextField } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
const SearchBar = ({ input, placeholder, setKeyword, clear }) => (
  <TextField
    id="search-bar"
    value={input}
    placeholder={placeholder}
    onChange={(event) => setKeyword(event.target.value)}
    variant="outlined"
    InputProps={{
      endAdornment: (
        <ClearRoundedIcon style={{ cursor: "pointer" }} onClick={clear} />
      ),
      startAdornment: <SearchRoundedIcon />,
    }}
  />
);

export default SearchBar;
