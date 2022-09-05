import "./list.scss";
import React from "react";
import { MovieList } from "../../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const List = () => {
  const { list } = useParams();

  const listName = list.includes("_")
    ? list.split("_").join("  ").toLocaleUpperCase()
    : list.toUpperCase();

  const { watchList, suggestList } = useSelector((store) => store.category);
  const data = list.includes("suggest_me") ? suggestList : watchList;

  return (
    <div>
      <>
        <MovieList title={listName} results={data} show={true} />
      </>
    </div>
  );
};

export default List;
