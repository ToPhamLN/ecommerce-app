import ReactQuill from "react-quill";
import React from "react";
import PropTypes from "prop-types";

const Editor = (props) => {
  const { value, onChange } = props;
  const handleOnChange = (content) => {
    onChange(content);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <React.Fragment>
      <div className="content">
        <ReactQuill
          value={value}
          modules={modules}
          onChange={handleOnChange}
        />
      </div>
    </React.Fragment>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Editor;
