import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { Pagination } from "@material-ui/lab";

import { fetchMarvelCharacter } from "../../store/actions";

import "./styles.css";

const Header = loadable(() => import("../../components/atom/Header"));

const MarvelCard = loadable(() =>
  import("../../components/organisms/MarvelCard")
);

const Home = ({ characters, getMarvelCharacter, isLoading }) => {
  const [offset, setOffSet] = useState(0);

  const renderCharacters = (characters) => (
    <div className="grid">
      {characters.map((character) => (
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
            {renderCharacters(characters)}
            {/* <Pagination
              count={Math.round(1559 / 24)}
              onChange={(event, page) => handleChange(page)}
            /> */}
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
});

const mapDispatchToProps = (dispatch) => ({
  getMarvelCharacter: (offset, limit) =>
    dispatch(fetchMarvelCharacter(offset, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
