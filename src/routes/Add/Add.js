import React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import Editor from "../../components/Editor";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

export default (props) => {
  const [createNote] = useMutation(ADD_NOTE);
  const _onSave = (title, content) => {
    const { history } = props;
    if (title !== "" && content !== "") {
      createNote({ variables: { title, content } });
      history.push("/");
    }
  };
  return <Editor onSave={_onSave} />;
};
