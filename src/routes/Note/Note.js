import React from "react";
import { Query } from "react-apollo";
import { GET_NOTE } from "../../queries";

export default (...props) => {
  const {
    match: {
      params: { id },
    },
  } = props[0];
  console.log("id:", id);
  return (
    <Query query={GET_NOTE} variables={{ id }}>
      {(data) => console.log("data:", data)}
    </Query>
  );
};
