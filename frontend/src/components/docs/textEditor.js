import React, {useRef,useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import ReactQuill, {handleQuillKeyDown, } from "react-quill";
import QuillToolbar, { modules, formats } from "./toolbar"; // Import your custom toolbar component

const TextEditor = () => {
  const quillRef = useRef(null);

  useEffect(() => {
    const quillInstance = quillRef.current?.getEditor();
    if (quillInstance) {
      quillInstance.root.addEventListener("keydown", handleQuillKeyDown);
    }
    return () => {
      if (quillInstance) {
        quillInstance.root.removeEventListener("keydown", handleQuillKeyDown);
      }
    };
  }, []);

  return (
    <Container className="justify-content-center align-items-center">
      <Card style={{ height: "90vh", margin: "2vh", width: "75%" }} bg="primary" text="black">
        <Card.Body style={{ height: "100%", overflow: "scroll", }} >
          <QuillToolbar quill={quillRef.current}  />
          <ReactQuill
            ref={quillRef}
            theme="snow"
            style={{
              width: "8.27in", 
              height: "11.69in", 
              backgroundColor: "white",
              margin: "2vh",
              overflow: 'hidden'
            }}
            modules={modules}
            formats={formats}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};


export default TextEditor;
