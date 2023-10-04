import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineCancelPresentation } from "react-icons/md";
import "./../assets/css/Deletion.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";

const Deletion = (props) => {
  const { data, setData, api } = props;
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(api);
      toast.warning(res.data.message, {
        autoClose: 1000,
      });
      setTimeout(() => {
        setData(!data);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data?.message, {
        autoClose: 1000,
      });
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
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

Deletion.propTypes = {
  data: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  api: PropTypes.string.isRequired,
};

export default Deletion;
