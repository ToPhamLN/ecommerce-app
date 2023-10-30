import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import { TbEyeSearch } from "react-icons/tb";
import {
  BiSearchAlt,
  BiSolidPencil,
  BiSolidTrashAlt,
} from "react-icons/bi";
import { Space, Table, Tag } from "antd";
import { routes } from "../../config/routes";

import Loading from "../../components/Loading";
import Deletion from "../../components/Deletion";
import axios from "../../config/axios";
import { productRequest } from "../../config/apiRequest";
import { formatNumber } from "../../utils/format";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(-1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: 100,
      align: "center",
      render: (_, product) => <span>{product._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      align: "center",
      render: (_, product) => (
        <img src={product.pictures[0].path} alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (_, product) => <span>{product.name}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 100,
      align: "center",
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
      align: "center",
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
      align: "center",
      render: (_, product) => (
        <span>{formatNumber(product?.price)} </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Is Sell",
      dataIndex: "isSell",
      with: 100,
      align: "center",
      render: (_, product) => {
        const color = product.isSell ? "green" : "red";
        const text = product.isSell ? "True" : "False";
        return <Tag color={color}>{text}</Tag>;
      },
      sorter: (a, b) => a?.isSell - b?.isSell,
    },
    {
      title: "Action",
      align: "center",
      render: (__, product) => (
        <Space className="table__box">
          <span
            className="action__table view"
            onClick={() => handleView(product._id)}
          >
            <TbEyeSearch />
          </span>
          <span
            className="action__table update"
            onClick={() => handleUpdate(product._id)}
          >
            <BiSolidPencil />
          </span>
          <span
            className="action__table delete"
            onClick={() => handleDelete(product._id)}
          >
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
  }, [search, update, showDelete]);
  const handleCreateProduct = () => {
    navigate(routes.createProduct);
  };
  const handleView = (productId) => {
    navigate(`/products/${productId}`);
  };
  const handleUpdate = (productId) => {
    navigate(`${routes.product}/${productId}/update`);
  };
  const handleDelete = (productId) => {
    setShowDelete(!showDelete);
    setSelectedProduct(productId);
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
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${productRequest.delete}/${selectedProduct}`}
        />
      )}
    </React.Fragment>
  );
};

export default ProductPage;
