import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import loadable from "@loadable/component";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { editCharacter } from "../../store/actions";

import "./styles.css";
import SearchBar from "../../components/atom/SearchBar";
import CharacterList from "../../components/atom/CharacterList";

const Header = loadable(() => import("../../components/atom/Header"));
const Edit = ({
  match: {
    params: { id },
  },
  characters,
  submit,
  history,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const [filteredCharacter, setFilteredCharacter] = useState([]);

  const nameInput = useRef();
  const descriptionInput = useRef();

  const character = characters.find(
    (character) => character.id === parseInt(id, 10)
  );

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submit({ name, description, index });

    history.push("/");
  };

  const updateInput = async (input) => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(input.toLowerCase())
    );
    setInput(input);
    setFilteredCharacter(filtered);
  };

  const setCharacter = (name) => {
    const finded = characters.find((character) => character.name === name);
    setName(finded.name);
    setDescription(finded.description);
    setIndex(finded.id);
  };

  useEffect(() => {
    if (character) {
      setName(character.name);
      setDescription(character.description);
      setIndex(id);
    }
  }, [character]);

  return (
    <section className="form-wrapper">
      <Header title="Edit character data" />
      {!id && !name ? (
        <div className="search-bar">
          <SearchBar input={input} setKeyword={updateInput} />
          <CharacterList
            characters={filteredCharacter}
            setCharacter={setCharacter}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <TextField
              id="character_name"
              fullWidth
              label="Name*"
              value={name}
              onChange={handleName}
              variant="outlined"
              ref={nameInput}
              helperText={name === "" ? "name is required" : ""}
              error={name === ""}
            />
            <TextField
              id="character_description"
              fullWidth
              label="Description*"
              multiline
              rows={5}
              value={description}
              defaultValue={description}
              ref={descriptionInput}
              onChange={handleDescription}
              helperText={description === "" ? "description is required" : ""}
              error={description === ""}
            />
            <div className="button-container">
              <Button type="submit" variant="contained" color="secondary">
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  characters: state.characters,
});

const mapDispatchToProps = (dispatch) => ({
  submit: (value) => dispatch(editCharacter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
