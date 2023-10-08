import React, { useState } from "react";
import {
  BsArrowBarRight,
  BsArrowBarLeft,
  BsFill7CircleFill,
  BsFillBagCheckFill,
  BsBox2Fill,
  BsKanbanFill,
} from "react-icons/bs";

import "../../assets/css/PictureProduct.css";
import PropTypes from "prop-types";

const PictureProduct = (props) => {
  const { product } = props;
  const { pictures } = product;
  const [slider, setSlider] = useState(0);
  const handleNextSlider = () => {
    setSlider((slider) =>
      slider == pictures.length - 1 ? 0 : slider + 1
    );
  };

  const handlePrevSlider = () => {
    setSlider((slider) =>
      slider == 0 ? pictures.length - 1 : slider - 1
    );
  };

  const handleSetSlider = (slider) => {
    setSlider(slider);
  };

  return (
    <React.Fragment>
      <div className="slide__picture">
        <div className="show__picture">
          <span onClick={handlePrevSlider}>
            <BsArrowBarLeft />
          </span>
          <div className="picture__item__product">
            <img
              src={pictures[slider].path}
              alt={pictures[slider].filename}
            />
          </div>
          <span onClick={handleNextSlider}>
            <BsArrowBarRight />
          </span>
        </div>
        <div className="picture__list">
          {pictures.map((picture, index) => (
            <div
              key={index}
              className="picture__list_item"
              onClick={() => handleSetSlider(index)}
            >
              <img src={picture.path} alt={picture.filename} />
            </div>
          ))}
        </div>
      </div>
      <div className="attention">
        <div className="det__attention">
          <span className="icon">
            <BsFill7CircleFill />
          </span>
          <span className="text">7 days free returns</span>
        </div>
        <div className="det__attention">
          <span className="icon">
            <BsFillBagCheckFill />
          </span>
          <span className="text">100% genuine product</span>
        </div>{" "}
        <div className="det__attention">
          <span className="icon">
            <BsBox2Fill />
          </span>
          <span className="text">Free shipping</span>
        </div>
        <div className="det__attention">
          <span className="icon">
            <BsKanbanFill />
          </span>
          <span className="text">1 year genuine</span>
        </div>
      </div>
    </React.Fragment>
  );
};

PictureProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default PictureProduct;
