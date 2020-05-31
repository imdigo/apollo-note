import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GET_NOTE } from "../../queries";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

const Button = styled.button``;

export default (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id },
  });

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) return `Error! ${error.message}`;

  return (
    data && (
      <>
        <TitleComponent>
          <Title>{data.note && data.note.title}</Title>
          <Link to={`/edit/${data.note.id}`}>
            <Button>Edit</Button>
          </Link>
        </TitleComponent>
        <MarkdownRenderer markdown={data.note.content} />{" "}
      </>
    )
  );
};
