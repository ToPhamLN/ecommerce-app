import React, { useEffect, useState } from "react";
import NavCategory from "../../components/NavCategory";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Pagination, Space, Tag, FloatButton } from "antd";
import "../../assets/css/Home.css";
import SelectBrand from "../../components/SelectBrand";
import Loading from "../../components/Loading";
import axios from "axios";
import { productRequest } from "../../config/apiRequest";
import { formatDate } from "../../utils/format";
import Slide from "./Slide";

const HomPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, watch } = useForm();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [gtePrice, setGtePrice] = useState(null);
  const [ltePrice, setLtePrice] = useState(null);
  const [sort, setSort] = useState(null);
  const brand = watch("brand");
  const [category, setCategory] = useState(null);

  const handleGetProucts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(productRequest.getAllSell, {
        params: {
          page: page,
          limit: limit,
          gtePrice: gtePrice,
          ltePrice: ltePrice,
          sort: sort,
          brand: brand,
          category: category,
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
    handleGetProucts();
  }, [page, limit, gtePrice, ltePrice, sort, brand, category]);

  const onChangePagination = (page, pageSize) => {
    setPage(page);
    setLimit(pageSize);
  };
  return (
    <React.Fragment>
      <NavCategory data={category} setData={setCategory} />
      <div className="container__home">
        <Slide />
        <section className="filters">
          <div className="filters__title">Filters:</div>
          <div className="filters__sort">
            <div className="brand__sort sort__item">
              <span>Brand: </span>
              <SelectBrand register={register} />
            </div>
            <div className="price__sort sort__item">
              <span>Price: </span>
              <select
                className="select__price"
                onChange={(e) => {
                  setGtePrice(e.target.value);
                }}
              >
                <option value={null}></option>
                <option value="0">0</option>
                <option value="100000">100.000</option>
                <option value="200000">200.000</option>
                <option value="300000">300.000</option>
                <option value="400000">400.000</option>
              </select>
              <span>to</span>
              <select
                className="select__price"
                onChange={(e) => setLtePrice(e.target.value)}
              >
                <option value={null}></option>
                <option value="200000">200.000</option>
                <option value="400000">400.000</option>
                <option value="800000">800.000</option>
                <option value="1000000">1.000.000</option>
                <option value="20000000">2.000.000</option>
              </select>
            </div>
            <div
              className="text__sort sort__item"
              onChange={(e) => setSort(e.target.value)}
            >
              <span>Sort:</span>
              <select className="select__sort">
                <option value={undefined}></option>
                <option value={1}>Name A-Z</option>
                <option value={-1}>Name Z-A</option>
              </select>
            </div>
          </div>
        </section>
        <section className="product__wrapper">
          {loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              {products && products.length > 0 ? (
                products.map((product, index) => (
                  <article key={index} className="product__item">
                    <div className="picture">
                      <img
                        src={product.pictures[0].path}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <span className="product__item__name">
                        {product.name}
                      </span>
                      <span className="product__item__updated">
                        {formatDate(product.updatedAt)}
                      </span>
                      <div className="product__item__content">
                        <Tag color="#208A49">Reply 0%</Tag>
                        <Tag color="#6610F2">
                          Online is so cheap
                        </Tag>
                      </div>
                      <div className="product__item__price__wrapper">
                        <span className="product__item__oldprice">
                          {product.oldprice.toLocaleString() +
                            " vnđ"}
                        </span>
                        <span className="product__item__price">
                          {product.price.toLocaleString() +
                            " vnđ"}
                        </span>
                      </div>

                      <Link
                        className="product__item__btn"
                        to={`/products/${product._id}`}
                      >
                        Read more
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no__data__found">
                  No Product Found!
                </div>
              )}
              <div className="pagination">
                <Space direction="vertical">
                  <Pagination
                    current={page}
                    pageSize={limit}
                    onChange={onChangePagination}
                    total={products.length + 12}
                  />
                </Space>
              </div>
            </React.Fragment>
          )}
        </section>
      </div>

      <FloatButton.BackTop />
    </React.Fragment>
  );
};

export default HomPage;
