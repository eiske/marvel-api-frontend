import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";

import "./styles.css";

const Serie = ({ name, url }) => {
  const ts = Number(new Date());
  const publicKey = "950610a07d645e102e76a039a042007e";
  const privateKey = "782f4183080e5c5d53087bb698d212346e4e5289";
  const hash = md5(ts + privateKey + publicKey);

  const [imgUrl, setImrUrl] = useState("");

  useEffect(() => {
    const getSerie = async () => {
      const response = await axios.get(
        `${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );

      const {
        data: {
          data: { results },
        },
      } = response;

      if (results.length !== 0) {
        setImrUrl(
          `${results[0].thumbnail.path}.${results[0].thumbnail.extension}`
        );
      }
    };

    getSerie();
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="serie">
      <img src={imgUrl} alt={name} className="serie" />
      <p className="name">{name}</p>
    </div>
  );
};

export default Serie;
