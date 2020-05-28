import React, { useState, useEffect } from "react";
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

type Post = {
  title: string;
  content: string;
  id: number;
};

const Editor = (props: any) => {
  const _onInputChange = (event: any) => {
    const {
      target: { value, name },
    } = event;
    this.setState({
      [name]: value,
    });
  };
  const _onSave = () => {
    const { onSave } = this.props;
    const { title, content, id } = this.state;
    onSave(title, content, id);
  };

  const [post, setPost] = useState<Post>(null);

  useEffect(() => {
    setPost({
      title: props.title || "",
      content: props.content || "",
      id: props.id || null,
    });
  }, []);

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
