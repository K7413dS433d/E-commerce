import Slider from "react-slick";
import { useContext } from "react";
import { apiData } from "./../../Contexts/DataContext";

function CategorySlider() {
  const { categoriesName } = useContext(apiData);

  const settings = {
    speed: 5000,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: -1000000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="slider-container hover:cursor-pointer">
      <Slider {...settings}>
        {categoriesName?.data.data.map((item, idx) => {
          return (
            <div className="px-3 outline-none" key={idx}>
              <img
                src={item.image}
                alt={item.name}
                className="block h-[100px]  md:h-[200px] w-full object-cover  "
              />
              <p className="w-full text-center text-secondary">{item.name}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CategorySlider;
