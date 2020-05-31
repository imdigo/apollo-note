import React from "react";
import Editor from "../../components/Editor";
import { useMutation, useQuery } from "react-apollo";
import { GET_NOTE } from "../../queries";
import gql from "graphql-tag";

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

export default (props) => {
  const _onSave = (title, content, id) => {
    const { history } = props;
    if (title !== "" && content !== "" && id) {
      console.log(title, content, id);
      editNote({ variables: { title, content, id } });
      history.push("/");
    }
  };

  const {
    match: {
      params: { id },
    },
  } = props;
  const [editNote] = useMutation(EDIT_NOTE);
  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id },
  });

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) return `Error! ${error.message}`;

  return (
    data && (
      <Editor
        title={data.note.title}
        content={data.note.content}
        id={data.note.id}
        onSave={_onSave}
      />
    )
  );
};
