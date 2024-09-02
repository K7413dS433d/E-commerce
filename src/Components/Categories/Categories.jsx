import { useState, useContext, useEffect } from "react";
import { apiData } from "./../../Contexts/DataContext";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import toast from "react-hot-toast";

function Categories() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { categoriesName, categoriesLoading } = useContext(apiData);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //Active category
  const [activeCategory, setActiveCategory] = useState("");

  async function getSubCategories(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      setSubCategories(data);
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  }

  //default category
  useEffect(() => {
    if (categoriesName) {
      getSubCategories(categoriesName?.data.data[0]._id);
      setActiveCategory(categoriesName?.data.data[0]._id);
    }
    window.scrollTo({
      top: 0,
    });
  }, [categoriesLoading]);

  return (
    <section>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full mt-12 w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                {/*mobile Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    {categoriesName?.data.data.map((category) => (
                      <li
                        className=" cursor-pointer hover:text-primary duration-500 block px-2 py-3"
                        key={category.name}
                        onClick={() => {
                          setActiveCategory(category._id);
                          getSubCategories(category._id);
                          setMobileFiltersOpen(false);
                        }}
                      >
                        <span
                          className={`${
                            activeCategory === category._id
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          {category.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
                All Categories
              </h1>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {categoriesName?.data.data.map((category) => (
                      <li
                        className=" cursor-pointer hover:text-primary duration-500"
                        key={category.name}
                        onClick={() => {
                          setActiveCategory(category._id);
                          getSubCategories(category._id);
                        }}
                      >
                        <span
                          className={`${
                            activeCategory === category._id
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          {category.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3  border border-dotted bg-[#EEEE] min-h-64">
                  {loading ? (
                    <div className="relative flex justify-center items-center h-full w-full">
                      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#2f722f]"></div>
                      <i className="fa-solid fa-cart-shopping   text-primary text-2xl md:text-5xl me-1"></i>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
                      {subCategories?.data?.length <= 0 ? (
                        <h2 className="text-red-900 text-md  md:text-xl w-full">
                          No Subcategory...
                        </h2>
                      ) : (
                        subCategories?.data?.map((item) => {
                          return (
                            <p
                              className="p-5 text-center hover:bg-primary border border-primary hover:text-white cursor-pointer duration-300 rounded-lg flex items-center justify-center"
                              key={item._id}
                            >
                              {item.name}
                            </p>
                          );
                        })
                      )}
                      {}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
export default Categories;
