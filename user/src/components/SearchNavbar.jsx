import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "../config/axios";
import { productRequest } from "../config/apiRequest";
import { useNavigate } from "react-router-dom";

const SearchNavbar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleGetProducts = async () => {
    try {
      const res = await axios.get(productRequest.getAllSell, {
        params: {
          search: search,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [search]);
  return (
    <React.Fragment>
      <div className="search__nav">
        <div className="search__nav__form">
          <input
            className="search__nav__input"
            type="text"
            placeholder="Enter for search"
            value={search}
            onChange={(e) => handleOnChange(e)}
          />
          <span className="search__nav__btn">
            {search ? (
              <AiFillCloseCircle onClick={() => setSearch("")} />
            ) : (
              <FaSearch />
            )}
          </span>
        </div>
        {search && (
          <div className="product__search__nav">
            <div className="wrapper">
              {products.length === 0 ? (
                <div>Nodata</div>
              ) : (
                products.map((product, index) => (
                  <div
                    className="product__search__item"
                    key={index}
                    onClick={() => {
                      navigate(`/products/${product._id}`);
                      setSearch("");
                    }}
                  >
                    <div className="product__search__picture">
                      <img
                        src={product.pictures[0].path}
                        alt=""
                      />
                    </div>
                    <span className="product__search__name">
                      {product.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchNavbar;
