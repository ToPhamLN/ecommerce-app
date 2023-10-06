import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import Loading from "../../components/Loading";
import "../../assets/css/Brand.css";
import { categoryRequest } from "../../config/apiRequest";
import CreateCategory from "./CreateCategory";
import { routes } from "../../config/routes";
import { sliceString } from "../../../utils/format";
import Deletion from "../../components/Deletion";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
      render: (_, category) => <span>{category._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      align: "center",
      render: (_, category) => (
        <img src={category.picturePath} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (_, category) => <span>{category.name}</span>,

      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (_, category) => (
        <span>{sliceString(category.description, 25)}</span>
      ),
      sorter: (a, b) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Properties",
      width: 100,
      dataIndex: "properties",
      align: "center",
      render: (_, { properties }) => (
        <>
          {properties.map((item, index) => (
            <Tag key={index} color="#5A8DDC">
              {item}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      width: 150,
      align: "center",
      render: (_, category) => (
        <Space className="table__box">
          {/* <span className="action__table view">
            <TbEyeSearch />
          </span> */}
          <span
            className="action__table update"
            onClick={() => handleUpdate(category._id)}
          >
            <BiSolidPencil />
          </span>
          <span
            className="action__table delete"
            onClick={() => handleDelete(category._id)}
          >
            <BiSolidTrashAlt />
          </span>
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
  }, [showCreate, showDelete, search, update]);

  const handleDelete = async (categoryId) => {
    setShowDelete(!showDelete);
    setSelectedCategory(categoryId);
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
      )}
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${categoryRequest.delete}/${selectedCategory}`}
        />
      )}
    </React.Fragment>
  );
};

export default CategoryPage;
