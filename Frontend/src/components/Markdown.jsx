import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content,classname }) => {
  return <ReactMarkdown className={classname}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;
