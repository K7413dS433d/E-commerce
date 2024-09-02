import Skeleton from "react-loading-skeleton";
import AllProductsSkeleton from "./AllProductsSkeleton";

function WishListSkeleton() {
  return (
    <>
      <p className=" text-sm mb-2">
        <Skeleton height={20} width={130} />
      </p>
      <div className="mb-2">
        <Skeleton height={15} width={80} />
      </div>
      <AllProductsSkeleton />
    </>
  );
}

export default WishListSkeleton;
