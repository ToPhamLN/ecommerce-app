import React, { useEffect, useState } from "react";
import { Table, Avatar, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../../utils/format";
import Loading from "../../components/Loading";
import { feedbackRequest } from "../../config/apiRequest";
import { TbEyeSearch } from "react-icons/tb";

import "../../assets/css/User.css";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
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
      render: (_, feedbacks) => <span>{feedbacks._id}</span>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: 100,
      align: "center",
      render: (_, feedbacks) => (
        <Avatar src={feedbacks.sender.avatar.path} size={70} />
      ),
    },
    {
      title: "User Name ",
      dataIndex: "username",
      width: 100,
      render: (_, feedbacks) => (
        <div
          className="properties__container__table"
          style={{
            fontWeight: "500",
            fontStyle: "italic",
            textTransform: "none",
          }}
        >
          <Link>{feedbacks.sender.username}</Link>
        </div>
      ),
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "title ",
      dataIndex: "title",
      render: (_, feedbacks) => (
        <div
          className="properties__container__table"
          style={{
            fontWeight: "500",
            fontStyle: "italic",
            textTransform: "none",
          }}
        >
          <span>{feedbacks.title}</span>
        </div>
      ),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      width: 100,
      render: (_, feedbacks) => (
        <span>{formatDate(feedbacks.createdAt)}</span>
      ),

      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: "Action",
      align: "center",
      render: (_, feedbacks) => (
        <Space
          className="table__box"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            to={`/feedback/${feedbacks._id}`}
            className="action__table view"
          >
            <TbEyeSearch />
          </Link>
        </Space>
      ),
    },
  ];
  const handleGetUsers = async () => {
    try {
      const res = await axios.get(feedbackRequest.getAll);
      setFeedbacks(res.data);
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
        <section className="ctn__all__order">
          {loading ? (
            <Loading />
          ) : (
            <Table
              dataSource={feedbacks}
              columns={columns}
              rowKey="_id"
            />
          )}
        </section>
      </div>
    </React.Fragment>
  );
};

export default FeedbackPage;
