import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/Loading";
import { brandRequest } from "../../config/apiRequest";
import "../../assets/css/Brand.css";
import CreateBrand from "./CreateBrand";
import { routes } from "../../config/routes";
const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState(null);
  const [update, setUpdate] = useState(-1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleGetAllBrand = async () => {
    try {
      const res = await axios.get(brandRequest.getAll, {
        params: {
          search: search,
          update: update,
          page: page,
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
  }, [showCreate, search, update, page]);

  const handleDelete = async (brandId) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${brandRequest.delete}/${brandId}`
      );
      toast.warning(res.data.message, {
        autoClose: 1000,
      });
      handleGetAllBrand();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data?.message, {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (brandId) => {
    navigate(`${routes.brand}/${brandId}`);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (brands.length >= 5) {
      setPage(page + 1);
    }
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
            brands.map((brand, index) => (
              <article key={index} className="brand__item">
                <div className="brand__item__img">
                  <img
                    src={brand.picturePath}
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="center">
                  <span className="brand__item__info__name">
                    {brand.name}
                  </span>
                  <span className="brand__item__info__description">
                    {brand.description}
                  </span>
                </div>
                <div className="control">
                  <button
                    className="delete"
                    onClick={() => handleDelete(brand._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update"
                    onClick={() => handleUpdate(brand._id)}
                  >
                    Update
                  </button>
                </div>
              </article>
            ))
          )}
          {brands.length === 0 && (
            <span className="no__data">There is no data</span>
          )}
        </section>
        <div className="page">
          <div className="container__page">
            <button
              className="prev__page"
              onClick={() => handlePrevPage()}
            >
              <BsFillArrowLeftSquareFill />
              Prev
            </button>
            <button
              className="next__page"
              onClick={() => handleNextPage()}
            >
              Next
              <BsFillArrowRightSquareFill />
            </button>
          </div>
        </div>
      </div>
      {showCreate && (
        <CreateBrand data={showCreate} setData={setShowCreate} />
      )}
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

export default BrandPage;
