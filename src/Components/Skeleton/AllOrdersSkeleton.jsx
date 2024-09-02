import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

function AllOrdersSkeleton() {
  // set scroll to start at the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <p className=" text-sm">
        <Skeleton height={20} width={130} />
      </p>
      <div>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-3 rounded-xl ">
            <div>
              <Skeleton height={110} borderRadius={10} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllOrdersSkeleton;
