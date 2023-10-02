import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import { TbEyeSearch } from "react-icons/tb";
import {
  BiSearchAlt,
  BiSolidPencil,
  BiSolidTrashAlt,
} from "react-icons/bi";
import { Space, Table } from "antd";
import { routes } from "../../config/routes";

import Loading from "../../components/Loading";
import axios from "axios";
import { productRequest } from "../../config/apiRequest";
import { formatNumber } from "../../../utils/format";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(-1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: 100,
      render: (_, product) => <span>{product._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      render: (_, product) => (
        <img src={product.picturePath} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      // width: 200,
      render: (_, product) => <span>{product.name}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 100,
      render: (_, product) => (
        <Link to={`${routes.category}/${product.category._id}`}>
          {product?.category.name}
        </Link>
      ),
      sorter: (a, b) =>
        a.category.name.localeCompare(b.category.name),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      width: 100,
      render: (_, product) => (
        <Link to={`${routes.brand}/${product.brand._id}`}>
          {product?.brand.name}
        </Link>
      ),
      sorter: (a, b) =>
        a?.brand.name.localeCompare(b?.brand.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 100,
      render: (_, product) => (
        <span>{formatNumber(product?.price)} </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      width: 200,
      render: (__, product) => (
        <Space className="table__box">
          <span className="action__table view">
            <TbEyeSearch />
          </span>
          <span
            className="action__table update"
            onClick={() => handleUpdate(product._id)}
          >
            <BiSolidPencil />
          </span>
          <span className="action__table delete">
            <BiSolidTrashAlt />
          </span>
        </Space>
      ),
    },
  ];
  const handleGetAllProducts = async () => {
    try {
      const res = await axios.get(productRequest.getAll, {
        params: {
          search: search,
          update: update,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllProducts();
  }, [search, update]);
  const handleCreateProduct = () => {
    navigate(routes.createProduct);
  };

  const handleUpdate = (productId) => {
    navigate(`${routes.product}/${productId}/update`);
  };
  return (
    <React.Fragment>
      <div className="container__brand">
        <section className="create__brand">
          <button
            className="toggle__create__brand"
            onClick={() => handleCreateProduct()}
          >
            <MdCreateNewFolder />
            Create new Product
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
              dataSource={products}
              columns={columns}
              rowKey="_id"
            />
          )}
        </section>
      </div>
    </React.Fragment>
  );
};

export default ProductPage;
