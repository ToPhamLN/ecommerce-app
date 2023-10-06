import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadMultiple = (props) => {
  const { control } = props;

  return (
    <React.Fragment>
      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <Upload
            name="file"
            beforeUpload={(file) => {
              field.onChange([...(field.value || []), file]);
              return false;
            }}
            onRemove={(file) => {
              const index = field.value.indexOf(file);
              const newFileList = field.value.slice();
              newFileList.splice(index, 1);
              field.onChange(newFileList);
            }}
            fileList={field.value || []}
            maxCount={5}
            listType="picture"
            multiple
          >
            <Button
              className="upload__btn"
              icon={<UploadOutlined />}
            >
              Click to Upload
            </Button>
          </Upload>
        )}
      />
    </React.Fragment>
  );
};

UploadMultiple.propTypes = {
  control: PropTypes.object.isRequired,
};

export default UploadMultiple;
