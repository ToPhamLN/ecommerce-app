import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/Loading";
import "../../assets/css/Brand.css";
import { categoryRequest } from "../../config/apiRequest";
import CreateCategory from "./CreateCategory";
import { routes } from "../../config/routes";
import { sliceString } from "../../../utils/format";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(-1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, category) => <span>{category._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      render: (_, category) => (
        <img src={category.picturePath} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, category) => <span>{category.name}</span>,

      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, category) => (
        <span>{sliceString(category.description, 130)}</span>
      ),
      sorter: (a, b) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Action",
      width: 210,
      render: (_, category) => (
        <Space size="middle">
          <button
            className="delete"
            onClick={() => handleDelete(category._id)}
          >
            Delete
          </button>
          <button
            className="update"
            onClick={() => handleUpdate(category._id)}
          >
            Update
          </button>
        </Space>
      ),
    },
  ];

  const handleGetAllCategories = async () => {
    try {
      const res = await axios.get(categoryRequest.getAll, {
        params: {
          search: search,
          update: update,
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllCategories();
  }, [showCreate, search, update]);

  const handleDelete = async (categoryId) => {
    console.log(categoryId);
    try {
      setLoading(true);
      const res = await axios.delete(
        `${categoryRequest.delete}/${categoryId}`
      );
      toast.warning(res.data.message, {
        autoClose: 1000,
      });
      handleGetAllCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message, {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (categoryId) => {
    navigate(`${routes.category}/${categoryId}`);
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
              dataSource={categories}
              columns={columns}
              rowKey="_id"
            />
          )}
        </section>
      </div>
      {showCreate && (
        <CreateCategory
          data={showCreate}
          setData={setShowCreate}
        />
      )}{" "}
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

export default CategoryPage;
