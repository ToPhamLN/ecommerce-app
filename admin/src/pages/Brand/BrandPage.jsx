import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import {
  BiSearchAlt,
  BiSolidPencil,
  BiSolidTrashAlt,
} from "react-icons/bi";
import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/Loading";
import { brandRequest } from "../../config/apiRequest";
import "../../assets/css/Brand.css";
import CreateBrand from "./CreateBrand";
import { routes } from "../../config/routes";
import { sliceString } from "../../utils/format";
import Deletion from "../../components/Deletion";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(-1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      align: "center",
      render: (_, brands) => <span>{brands._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      align: "center",
      render: (_, brand) => (
        <img src={brand.picturePath} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (_, brand) => <span>{brand.name}</span>,

      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (_, brand) => (
        <span>{sliceString(brand.description, 30)}</span>
      ),
      sorter: (a, b) =>
        a.description.localeCompare(b.description),
    },
    {
      title: "Action",
      align: "center",
      render: (_, brand) => (
        <Space className="table__box">
          {/* <span className="action__table view">
            <TbEyeSearch />
          </span> */}
          <span
            className="action__table update"
            onClick={() => handleUpdate(brand._id)}
          >
            <BiSolidPencil />
          </span>
          <span
            className="action__table delete"
            onClick={() => handleDelete(brand._id)}
          >
            <BiSolidTrashAlt />
          </span>
        </Space>
      ),
    },
  ];

  const handleGetAllBrand = async () => {
    try {
      const res = await axios.get(brandRequest.getAll, {
        params: {
          search: search,
          update: update,
        },
      });
      setBrands(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllBrand();
  }, [showCreate, showDelete, search, update]);

  const handleDelete = async (brandId) => {
    setSelectedBrand(brandId);
    setShowDelete(!showDelete);
  };

  const handleUpdate = (brandId) => {
    navigate(`${routes.brand}/${brandId}`);
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
            Create new brand
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
              dataSource={brands}
              columns={columns}
              rowKey="_id"
              // pagination={false}
            />
          )}
        </section>
      </div>
      {showCreate && (
        <CreateBrand data={showCreate} setData={setShowCreate} />
      )}
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${brandRequest.delete}/${selectedBrand}`}
        />
      )}
    </React.Fragment>
  );
};

export default BrandPage;
