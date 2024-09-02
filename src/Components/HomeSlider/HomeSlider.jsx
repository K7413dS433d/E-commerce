import Slider from "react-slick";
import img1 from "../../assets//sliderImages/slider-image-1.png";
import img2 from "../../assets/sliderImages/slider-image-2.png";
import img3 from "../../assets/sliderImages/slider-image-3.png";
import { useNavigate } from "react-router-dom";

function HomeSlider() {
  //carousel settings
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  const navigator = useNavigate();

  return (
    <div className="slider-container  ">
      <Slider {...settings}>
        <div className="outline-none relative">
          <img
            src={img1}
            alt="slider image 1"
            className=" block w-full h-[250px] md:h-[400px] lg:h-[500px] "
          />
          <div className="absolute z-10 top-[-10%] left-10 right-0 bottom-0 flex flex-col gap-2  md:gap-5 justify-center p-5">
            <h2 className=" uppercase font-bold font-Hackney  text-[#316431]  w-[200px] md:w-[350px] lg:w-[550px] text-3xl md:text-5xl lg:text-7xl  select-none pointer-events-none">
              Everything You Need All in One Place
            </h2>
            <p className="text-black font-Gilroy w-[200px] md:w-[350px] lg:w-[550px] text-xs md:text-lg lg:text-2xl">
              Explore our Website to find all new stuff
            </p>
            <div className="flex gap-5 ">
              <button
                onClick={() => navigator("/products")}
                type="submit"
                className=" text-white bg-[#316431] hover:bg-transparent border hover:border-[#316431] hover:text-secondary duration-500  rounded-full  text-[.7rem] md:text-xl lg:text-[1.2rem] w-[100px] md:w-[150px] lg:w-[190px] py-[.1rem] md:py-1  text-center "
              >
                Start Now
              </button>
              <button
                onClick={() => navigator("/contactUs")}
                type="submit"
                className=" text-[#316431] border border-[#316431] hover:bg-secondary hover:text-white duration-500  rounded-full  text-[.7rem] md:text-xl lg:text-[1.2rem] w-[100px] md:w-[150px] lg:w-[190px] py-[.1rem] md:py-1  text-center "
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
        <div className="outline-none relative">
          <img
            src={img2}
            alt="slider image 2"
            className=" block w-full h-[250px] md:h-[400px] lg:h-[500px] "
          />
          <div className="absolute z-10 top-[-10%] left-10 right-0 bottom-0 flex flex-col gap-2  md:gap-5 justify-center p-5">
            <div>
              <p className=" uppercase font-bold font-Hackney text-[#682b4c] text-3xl md:text-5xl lg:text-6xl">
                chocozay
              </p>
              <h2 className=" uppercase font-bold font-Hackney  text-[#b33258]  w-[200px] md:w-[350px] lg:w-[550px] text-3xl md:text-5xl lg:text-8xl  select-none pointer-events-none">
                red velvet
              </h2>
            </div>
            <p className="text-[#b33258]  font-Gilroy w-[200px] md:w-[350px] lg:w-[550px] text-xs md:text-lg lg:text-2xl">
              Now Available in our shop
            </p>
            <div className="flex gap-5 ">
              <button
                onClick={() => navigator("/products")}
                type="submit"
                className=" text-white bg-[#b33258] hover:bg-transparent border hover:border-[#682b4c] hover:text-[#682b4c] duration-500  rounded-full  text-[.7rem] md:text-xl lg:text-[1.2rem] w-[100px] md:w-[150px] lg:w-[190px] py-[.1rem] md:py-1  text-center "
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
        <div className="outline-none relative">
          <img
            src={img3}
            alt="slider image 3"
            className=" block w-full h-[250px] md:h-[400px] lg:h-[500px] "
          />
          <div className="absolute z-10 top-[-10%] left-10 right-0 bottom-0 flex flex-col gap-2  md:gap-5 justify-center p-5">
            <div>
              <p className=" uppercase font-bold font-Hackney text-[#36277A] text-3xl md:text-5xl lg:text-7xl">
                Lasta
              </p>
              <h2 className=" uppercase font-bold font-Hackney  text-[#633d31]  text-3xl md:text-5xl lg:text-8xl  select-none pointer-events-none">
                cokoladni kolutici
              </h2>
            </div>
            <p className="text-[#633d31]  font-Gilroy w-[200px] md:w-[350px] lg:w-[550px] text-xs md:text-lg lg:text-2xl">
              Now Available in our shop
            </p>
            <div className="flex gap-5 ">
              <button
                onClick={() => navigator("/products")}
                type="submit"
                className=" text-white bg-[#36277A] hover:bg-transparent border hover:border-[#36277A] hover:text-[#36277A] duration-500  rounded-full  text-[.7rem] md:text-xl lg:text-[1.2rem] w-[100px] md:w-[150px] lg:w-[190px] py-[.1rem] md:py-1  text-center "
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default HomeSlider;
