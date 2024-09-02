import notFound from "./../../assets/error.svg";
function NotFound() {
  return (
    <section className="mt-16 flex justify-center items-center py-16">
      <div>
        <img src={notFound} alt="not found image" className="block w-full" />
      </div>
    </section>
  );
}

export default NotFound;
