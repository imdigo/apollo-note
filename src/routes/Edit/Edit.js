import React from "react";
import Editor from "../../components/Editor";
import { Query, useMutation } from "react-apollo";
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
  const [editNote] = useMutation(EDIT_NOTE);

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

  return (
    <Query query={GET_NOTE} variables={{ id }}>
      {({ data }) => {
        return data ? (
          <Editor
            title={data.note.title}
            content={data.note.content}
            id={data.note.id}
            onSave={_onSave}
          />
        ) : (
          <h1>Loading</h1>
        );
      }}
    </Query>
  );
};
