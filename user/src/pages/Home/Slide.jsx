import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "../../config/axios";
import { posterRequest } from "../../config/apiRequest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrPrevious, GrNext } from "react-icons/gr";

const Slide = () => {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleGetAllPosters = async () => {
      try {
        const res = await axios.get(posterRequest.getAll);
        setPosters(res.data);
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    handleGetAllPosters();
  }, []);

  const slideRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const prev = () => {
    slideRef.current.slickPrev();
  };

  const next = () => {
    slideRef.current.slickNext();
  };

  return (
    <React.Fragment>
      {!isLoading && (
        <div className="slide">
          <div className="slide-show">
            <Slider {...settings} ref={slideRef}>
              {posters.map((poster, index) => (
                <img
                  key={index}
                  src={poster.picture.path}
                  alt="slider"
                  className="slide-img"
                />
              ))}
            </Slider>
          </div>
          <div className="btn-prev" onClick={prev}>
            <GrPrevious />
          </div>
          <div className="btn-next" onClick={next}>
            <GrNext />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Slide;
