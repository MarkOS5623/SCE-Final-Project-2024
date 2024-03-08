import React from 'react';
import TextEditor from '../components/docs/textEditor';

function EditorPage() {
  const style = {
    // border: "10px solid black"
  }
  return (
    <div style={style}>
        <TextEditor/> 
    </div>
  );
}

export default EditorPage;
