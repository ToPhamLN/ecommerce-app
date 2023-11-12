import PropTypes from "prop-types";
import React, { useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "../config/axios";
import "./../assets/css/Deletion.css";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Deletion = (props) => {
  const { data, setData, api, reset, path } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(api);
      toast.warning(res.data.message, {
        autoClose: 1000,
      });
      if (path) {
        navigate(path);
      }
      reset();
      setData(!data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data?.message, {
          autoClose: 1000,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div className="container__deletion">
        <div className="deletion">
          <span className="title__deletion">Delete!</span>
          <span
            className="exit__deletion"
            onClick={() => setData(!data)}
          >
            <MdOutlineCancelPresentation />
          </span>
          <span className="content__deletion">
            Are you sure delete it ?
          </span>
          <button onClick={() => handleDelete()}>Oke</button>
        </div>
      </div>
      {loading && <Loading />}
    </React.Fragment>
  );
};

Deletion.propTypes = {
  data: PropTypes.bool,
  setData: PropTypes.func,
  reset: PropTypes.func,
  api: PropTypes.string,
  path: PropTypes.string,
};

export default Deletion;
