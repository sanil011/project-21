import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carouselImages from "../../../data/carousel";
import "./Carousel.css"; // Add this if not already

const Carousel = () => {
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3500,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {carouselImages.map((image) => (
          <div key={image} className="carousel-slide">
            <img src={image} className="carousel-image" alt="Carousel Slide" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
