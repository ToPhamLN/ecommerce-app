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
import { discountRequest } from "../../config/apiRequest";
import CreateDiscount from "./CreateDiscount";
import { routes } from "../../config/routes";
import Deletion from "../../components/Deletion";
import { formatNumber } from "../../utils/format";

const DiscountPage = () => {
  const [discounts, setDisCount] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState("");
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
      width: 100,
      align: "center",
      render: (_, discount) => <span>{discount._id}</span>,
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (_, discount) => <span>{discount.name}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Code",
      dataIndex: "code",
      align: "center",
      render: (_, discount) => <span>{discount.code}</span>,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Valid",
      dataIndex: "valid",
      width: 100,
      align: "center",
      render: (_, discount) => <span>{discount.valid}</span>,
      sorter: (a, b) =>
        parseFloat(b.valid) - parseFloat(a.valid),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 100,
      align: "center",
      render: (_, discount) => <span>{discount.quantity}</span>,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Condition",
      dataIndex: "condition",
      width: 100,
      align: "center",
      render: (_, discount) => (
        <span>{formatNumber(discount?.condition)}</span>
      ),
      sorter: (a, b) => a.condition - b.condition,
    },
    {
      title: "Action",
      width: 150,
      align: "center",
      render: (_, discount) => (
        <Space className="table__box">
          <span
            className="action__table update"
            onClick={() => handleUpdate(discount._id)}
          >
            <BiSolidPencil />
          </span>
          <span
            className="action__table delete"
            onClick={() => handleDelete(discount._id)}
          >
            <BiSolidTrashAlt />
          </span>
        </Space>
      ),
    },
  ];

  const handleGetAllCategories = async () => {
    try {
      const res = await axios.get(discountRequest.getAll, {
        params: {
          search: search,
          update: update,
        },
      });
      setDisCount(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllCategories();
  }, [showCreate, showDelete, search, update]);

  const handleDelete = async (discountId) => {
    setShowDelete(!showDelete);
    setSelectedDiscount(discountId);
  };

  const handleUpdate = (discountId) => {
    navigate(`${routes.discount}/${discountId}`);
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
            Create new Discount
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
              dataSource={discounts}
              columns={columns}
              rowKey="_id"
            />
          )}
        </section>
      </div>
      {showCreate && (
        <CreateDiscount
          data={showCreate}
          setData={setShowCreate}
        />
      )}
      {showDelete && (
        <Deletion
          data={showDelete}
          setData={setShowDelete}
          api={`${discountRequest.delete}/${selectedDiscount}`}
        />
      )}
    </React.Fragment>
  );
};

export default DiscountPage;
