import React, { useState } from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button``;

const Editor = (props) => {
  const [post, setPost] = useState({
    title: props.title || "",
    content: props.content || "",
    id: props.id || null,
  });

  const _onSave = () => {
    const { onSave } = props;
    const { title, content, id } = post;
    onSave(title, content, id);
  };

  const _onInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const { title, content } = post;
  return (
    <>
      <TitleContainer>
        <TitleInput
          value={title}
          onChange={_onInputChange}
          placeholder={"Untitled..."}
          name={"title"}
        />
        <Button onClick={_onSave}>Save</Button>
      </TitleContainer>
      <ContentPreview>
        <ContentInput
          value={content}
          onChange={_onInputChange}
          placeholder={"# This supports markdown!"}
          name={"content"}
        />
        <MarkdownRenderer markdown={content} className={"markdown"} />
      </ContentPreview>
    </>
  );
};

export default Editor;
