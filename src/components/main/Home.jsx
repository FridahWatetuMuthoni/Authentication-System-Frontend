import Image from "./Image";

function Home() {
  return (
    <section className=" body-font">
      <div className="container px-5 py-4 mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-4xl font-medium title-font mb-4">
            Gallery
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          <Image />
        </div>
      </div>
    </section>
  );
}

export default Home;
