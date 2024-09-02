import { useQuery } from "react-query";
import axios from "axios";
import BrandsSkeleton from "../Skeleton/BrandsSkeleton";
import { useEffect } from "react";

function Brands() {
  const { data: allBrands } = useQuery("brands", async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  });

  useEffect(() => {
    // set scroll to start at the top of the page
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <section className="mt-12 p-5 lg:p-10">
      {allBrands ? (
        <>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center  font-Alice text-secondary mt-3 mb-8">
            Discover Our Top Brands
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-5">
            {allBrands?.data.data.map((brand, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-center items-center  rounded-lg cursor-pointer hover:translate-y-[-5px] hover:scale-105 transform transition-all duration-500 shadow-custom-light"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className=" object-contain rounded-lg"
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <BrandsSkeleton />
      )}
    </section>
  );
}

export default Brands;
