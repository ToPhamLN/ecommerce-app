import React, { useEffect, useState } from "react";
import { Table, Avatar } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/format";
import Loading from "../../components/Loading";
import { userRequest } from "../../config/apiRequest";

import "../../assets/css/User.css";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gteDate, setGteDate] = useState(null);
  const [lteDate, setLteDate] = useState(null);
  const [sort, setSort] = useState(-1);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      align: "center",
      width: 100,
      render: (_, users) => <span>{users._id}</span>,
    },
    {
      title: "Picture",
      dataIndex: "picturePath",
      width: 100,
      align: "center",
      render: (_, users) => (
        <Avatar src={users.avatar.path} size={70} />
      ),
    },
    {
      title: "User Name ",
      dataIndex: "username",
      width: 100,
      render: (_, users) => (
        <div
          className="properties__container__table"
          style={{
            fontWeight: "500",
            fontStyle: "italic",
            textTransform: "none",
          }}
        >
          <Link>{users.username}</Link>
        </div>
      ),
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email ",
      dataIndex: "email",
      width: 100,
      render: (_, users) => (
        <div
          className="properties__container__table"
          style={{
            fontWeight: "500",
            fontStyle: "italic",
            textTransform: "none",
          }}
        >
          <Link>{users.email}</Link>
        </div>
      ),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      width: 100,
      render: (_, users) => (
        <span>{formatDate(users.createdAt)}</span>
      ),

      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
  ];
  const handleGetUsers = async () => {
    try {
      const res = await axios.get(userRequest.all);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <React.Fragment>
      <div className="container__user">
        <section className="filters">
          <div className="filters__title">Filters:</div>
          <div className="filters__sort">
            <div className="date__sort sort__item">
              <span>Date: </span>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => setGteDate(e.target.value)}
                placeholder="From"
              />
              <span> to </span>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => setLteDate(e.target.value)}
                placeholder="From"
              />
            </div>
            <div
              className="text__sort sort__item"
              onChange={(e) => setSort(e.target.value)}
            >
              <span>Sort:</span>
              <select className="select__sort">
                <option value={-1}>Latest update</option>
                <option value={1}>Oldest update</option>
              </select>
            </div>
          </div>
        </section>
      </div>
      <section className="ctn__all__order">
        {loading ? (
          <Loading />
        ) : (
          <Table
            dataSource={users}
            columns={columns}
            rowKey="_id"
          />
        )}
      </section>
    </React.Fragment>
  );
};

export default UserPage;
