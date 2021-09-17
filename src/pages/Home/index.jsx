import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { Pagination } from "@material-ui/lab";

import { fetchMarvelCharacter } from "../../store/actions";

import "./styles.css";

const Header = loadable(() => import("../../components/atom/Header"));
const SearchBar = loadable(() => import("../../components/atom/SearchBar"));

const MarvelCard = loadable(() =>
  import("../../components/organisms/MarvelCard")
);

const Home = ({ characters, getMarvelCharacter, isLoading }) => {
  const [offset, setOffSet] = useState(0);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [perPage, setPerPage] = useState(20);
  const [pages, setPages] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [dataCharacter, setDataCharacter] = useState([]);

  const updateInput = (input) => {
    setPage(1);
    setInput(input);
  };

  const clear = () => {
    setInput("");
  };

  const renderCharacters = () => (
    <div className="grid">
      {dataCharacter.slice(start, end).map((character) => (
        <Link key={character.id} to={`/character/${character.id}`}>
          <MarvelCard
            name={character.name}
            description={character.description}
            thumb={character.thumbnail.path}
            ext={character.thumbnail.extension}
          />
        </Link>
      ))}
    </div>
  );

  useEffect(() => {
    setPages(Math.ceil(characters.length / perPage));
    setStart(page * perPage - perPage);
    setEnd(start + perPage);
    const data = characters.filter((character) =>
      character.name.toLowerCase().includes(input.toLowerCase())
    );
    setDataCharacter(data);
  }, [characters, input, page, perPage, start]);

  useEffect(() => {
    async function asyncFetchMarvelCharacter(offset, limit) {
      if (characters.length === 0) {
        await getMarvelCharacter(offset, limit);
      }
    }
    asyncFetchMarvelCharacter(offset);
  }, []);

  return (
    <section className="list-characters">
      <div className="grid-container">
        <Header title="MARVEL CHARACTER LIST" />
        {!isLoading && characters ? (
          <>
            <SearchBar
              input={input}
              placeholder="Search character"
              setKeyword={updateInput}
              clear={clear}
            />
            {renderCharacters(input)}
            {input === "" ? (
              <Pagination
                count={pages}
                page={page}
                onChange={(event, page) => setPage(page)}
              />
            ) : null}
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  characters: state.characters,
  isLoading: state.isLoading,
  filteredCharacter: state.filteredCharacter,
});

const mapDispatchToProps = (dispatch) => ({
  getMarvelCharacter: (offset, limit) =>
    dispatch(fetchMarvelCharacter(offset, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
