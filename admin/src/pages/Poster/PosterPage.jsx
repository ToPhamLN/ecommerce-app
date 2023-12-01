import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import Loading from "../../components/Loading";
import "../../assets/css/Brand.css";
import { posterRequest } from "../../config/apiRequest";
import CreatePoster from "./CreatePoster";
import { routes } from "../../config/routes";
import { sliceString } from "../../utils/format";
import Deletion from "../../components/Deletion";

const PosterPage = () => {
  const [posters, setPosters] = useState([]);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(-1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      align: "center",
      width: 100,
      render: (_, poster) => <span>{poster._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      align: "center",
      render: (_, poster) => (
        <img
          src={poster.picture && poster.picture.path}
          alt=""
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
      render: (_, poster) => <span>{poster.title}</span>,

      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (_, poster) => (
        <span>{sliceString(poster.description, 25)}</span>
      ),
      sorter: (a, b) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Path",
      dataIndex: "path",
      align: "center",
      render: (_, poster) => <span>{poster.path}</span>,

      sorter: (a, b) => a.path.localeCompare(b.path),
    },
    {
      title: "Action",
      align: "center",
      width: 150,
      render: (_, poster) => (
        <Space className="table__box">
          {/* <span className="action__table view">
            <TbEyeSearch />
          </span> */}
          <span
            className="action__table update"
            onClick={() => handleUpdate(poster._id)}
          >
            <BiSolidPencil />
          </span>
          <span
            className="action__table delete"
            onClick={() => handleDelete(poster._id)}
          >
            <BiSolidTrashAlt />
          </span>
        </Space>
      ),
    },
  ];

  const handleGetAllPosters = async () => {
    try {
      const res = await axios.get(posterRequest.getAll, {
        params: {
          search: search,
          update: update,
        },
      });
      setPosters(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllPosters();
  }, [showCreate, showDelete, search, update]);

  const handleDelete = async (posterId) => {
    setShowDelete(!showDelete);
    setSelectedPoster(posterId);
  };

  const handleUpdate = (posterId) => {
    navigate(`${routes.poster}/${posterId}`);
  };

  return (
    <React.Fragment>
      <div className="container__brand">
        <section className="create__brand">
          <button
            className="toggle__create__brand"
            onClick={() => setShowCreate(!showCreate)}
          >
            <MdCreateNewFolder />
            Create new category
          </button>
          <div className="left">
            <div className="search">
              <span className="title">
                <BiSearchAlt />
              </span>
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="sort">
              <span className="title">Sort by: </span>
              <select
                name="sort"
                className="sort__select"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              >
                <option value={1} className="option__item__sort">
                  Late update
                </option>
                <option
                  value={-1}
                  className="option__item__sort"
                >
                  Early update
                </option>
              </select>
            </div>
          </div>
        </section>
        <section className="ctn__all__brand">
          {loading ? (
            <Loading />
          ) : (
            <Table
              dataSource={posters}
              columns={columns}
              rowKey="_id"
            />
          )}
        </section>
      </div>
      {showCreate && (
        <CreatePoster
          data={showCreate}
          setData={setShowCreate}
        />
      )}
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${posterRequest.delete}/${selectedPoster}`}
          reset={handleGetAllPosters}
        />
      )}
    </React.Fragment>
  );
};

export default PosterPage;
