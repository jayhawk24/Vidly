import React from "react";

const GenreGroup = (props) => {
  const { lgenres, genreClicked, selectedGenre } = props;
  const listgenres = lgenres.map((g) => (
    <li
      key={g._id}
      className={
        selectedGenre === g.name
          ? "list-group-item list-group-item-action active"
          : "list-group-item list-group-item-action"
      }
      onClick={() => genreClicked(g.name)}
    >
      {g.name}
    </li>
  ));

  return <ul className="list-group">{listgenres}</ul>;
};

export default GenreGroup;
