import Skeleton from "react-loading-skeleton";
import { Card } from "flowbite-react";

function AllProductsSkeleton() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  justify-center justify-items-center gap-7">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card className="w-full" key={i}>
          <Skeleton height={230} />
          <h5 className="text-xl font-semibold tracking-tight text-left text-gray-900 ">
            <Skeleton width={150} />
          </h5>
          <Skeleton width={"100%"} height={30} />
          <div className="flex items-center justify-between">
            <Skeleton width={120} height={40} />
            <Skeleton width={45} height={30} />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default AllProductsSkeleton;
