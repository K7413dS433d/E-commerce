import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

function BrandsSkeleton() {
  //get user cart
  useEffect(() => {
    // set scroll to start at the top of the page
    window.scrollTo({
      top: 0,
    });
    //no need to check token user cannot access cart without token
  }, []);

  return (
    <>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center font-Alice w-3/4 md:w-1/2 m-auto  text-[#265026] mt-3 mb-8">
        <Skeleton />
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-5">
        {Array.from({ length: 12 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="rounded-lg shadow-custom-light h-32 md:h-40"
            >
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BrandsSkeleton;
