import React from "react";

// import queryString from "query-string";
const Posts = ({ match }) => {
  //const { sortBy } = queryString.parse(props.location.search);
  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year} , Month: {match.params.month}
    </div>
  );
};

export default Posts;
