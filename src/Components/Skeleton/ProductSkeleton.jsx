import Skeleton from "react-loading-skeleton";
function ProductSkeleton() {
  return (
    <>
      <div className="col-span-12 md:col-start-4 md:col-end-9 lg:col-span-4 mb-5 lg:mb-0 py-5">
        <Skeleton  height={480} />
      </div>
      <div className="col-span-12 lg:col-span-8 flex  flex-col justify-center gap-4">
        <Skeleton height={30} />
        <Skeleton width={"80%"} />
        <Skeleton width={"30%"} height={20} />

        <div className="flex justify-between items-center mb-5">
          <Skeleton width={100} height={30} />
          <Skeleton width={150} height={20} />
        </div>
        <div className="flex  justify-between">
          <Skeleton containerClassName="flex-initial w-[70%]" height={35} />

          <Skeleton containerClassName="flex-initial w-[8%]" height={35} />
        </div>
      </div>
    </>
  );
}

export default ProductSkeleton;
