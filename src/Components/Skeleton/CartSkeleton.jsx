import Skeleton from "react-loading-skeleton";

function CartSkeleton() {
  return (
    <>
      <p className=" text-sm mb-5">
        <Skeleton height={16} width={100} />
      </p>
      <div className="px-3">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton height={20} width={130} />

            <Skeleton height={15} width={80} />
          </div>
          <Skeleton height={40} width={110} />
        </div>
        <div className="mb-5 ">
          <table className="m-auto w-full  border-separate border-spacing-y-5">
            <thead>
              <tr>
                <td>
                  <Skeleton height={35} />
                </td>
              </tr>
            </thead>
            <tbody className="w-full text-center ">
              <tr className="bg-white border-b ">
                <td>
                  <Skeleton height={80} />
                </td>
              </tr>
              <tr className="bg-white border-b ">
                <td>
                  <Skeleton height={80} />
                </td>
              </tr>
              <tr className="bg-white border-b ">
                <td>
                  <Skeleton height={80} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" w-1/2 md:w-1/4 m-auto">
          <Skeleton height={40} />
        </div>
      </div>
    </>
  );
}

export default CartSkeleton;
