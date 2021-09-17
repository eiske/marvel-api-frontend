import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import loadable from "@loadable/component";
import { CircularProgress } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Link } from "react-router-dom";

import { fetchCharacter } from "../../store/actions";

import "./styles.css";

const HeroBanner = loadable(() =>
  import("../../components/molecules/HeroBanner")
);

const Serie = loadable(() => import("../../components/molecules/Serie"));
const Header = loadable(() => import("../../components/atom/Header"));

const Character = ({
  match: {
    params: { id },
  },
  getSingleCharacter,
  singleCharacter,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [srcImg, setSrcImg] = useState("");
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const asyncSingleCharacter = async () => {
      await getSingleCharacter(id);
    };

    asyncSingleCharacter();
  }, []);

  useEffect(() => {
    if (singleCharacter) {
      setSrcImg(
        `${singleCharacter.thumbnail.path}.${singleCharacter.thumbnail.extension}`
      );
      setName(singleCharacter.name);
      setSeries(singleCharacter.series.items);
    }
  }, [singleCharacter]);

  return !isLoading ? (
    <>
      <HeroBanner srcImg={srcImg} name={name} />
      <section className="character-detail">
        <div className="series-container">
          <Link to={`/edit/${id}`}>
            <EditRoundedIcon fontSize="small" />
            Edit character
          </Link>
          {series.length !== 0 ? (
            <>
              <Header title="Series" />
              <div className="series grid">
                {series.map((serie) => (
                  <Serie
                    key={serie.name}
                    name={serie.name}
                    url={serie.resourceURI.replace("http", "https")}
                  />
                ))}
              </div>
            </>
          ) : (
            <h1>There is no series to show</h1>
          )}
        </div>
      </section>
    </>
  ) : (
    <CircularProgress />
  );
};

const mapStateToProps = (state) => ({
  singleCharacter: state.singleCharacter[0],
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleCharacter: (id) => dispatch(fetchCharacter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Character);
