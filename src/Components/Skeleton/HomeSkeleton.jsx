import Skeleton from "react-loading-skeleton";
import AllProductsSkeleton from "./AllProductsSkeleton";

function HomeSkeleton() {
  return (
    <>
      <div className=" h-[210px] sm:h-[240px] md:h-[390px] lg:h-[500px]">
        <Skeleton height={"100%"} />
      </div>
      <div className=" text-center">
        <Skeleton count={1} width={250} height={30} />
        <Skeleton height={200} />
      </div>
      <AllProductsSkeleton />
    </>
  );
}

export default HomeSkeleton;
