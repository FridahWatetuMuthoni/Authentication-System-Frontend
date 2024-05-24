import useGlobalContext from "../../hooks/useGlobalContext";
import { Pagination, Search, Image } from "./";
import { Loading, Error } from "../Utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
  const { search, page, setPage } = useGlobalContext();
  const API_KEY = import.meta.env.VITE_API_KEY;
  let totalPages = 1;
  let results = [];

  const { error, isPending, data } = useQuery({
    queryKey: ["images", page, search],
    queryFn: async () => {
      let url;
      const all_photos = `https://api.unsplash.com/photos?&per_page=12`;
      const search_photos = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&per_page=12`;
      if (search === null) {
        url = all_photos;
      } else {
        url = search_photos;
      }
      const response = await axios.get(url, {
        headers: {
          "Accept-Version": "v1",
          Authorization: `Client-ID ${API_KEY}`,
        },
      });
      return response;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (search) {
    const linkHeader = data.headers["link"];
    if (linkHeader) {
      const links = linkHeader.split(",").reduce((acc, link) => {
        const match = link.match(/<(.*?)>; rel="(.*?)"/);
        if (match) {
          acc[match[2]] = match[1];
        }
        return acc;
      }, {});
      const last_str = links.last;
      const last_page = last_str.split("?")[1].split("=")[1];
      totalPages = parseInt(last_page);
    }
  }

  if (search === null) {
    const available = data?.data?.results?.length > 0 ? true : false;
    if (available) {
      results = data?.data.results;
    } else {
      results = data?.data;
    }
  } else {
    results = data?.data?.results;
  }

  return (
    <section className=" body-font">
      <div className="container px-5 py-4 mx-auto">
        <div className="">
          <div className="dark:bg-transparent">
            <div className="mx-auto flex flex-col items-center py-3 sm:py-6">
              <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl text-center  leading-10">
                  Lets not stress for{" "}
                  <span className="text-violet-800 dark:text-violet-500">
                    Website{" "}
                  </span>
                  photos
                </h1>
                <p className="mt-2 sm:mt-6 lg:w-10/12  text-center text-muted text-sm md:text-xl">
                  A gallery of the best quality images.
                </p>
              </div>
              <section className="flex w-11/12 md:w-8/12 xl:w-6/12 mb-3">
                <Search />
              </section>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -m-4 item-center justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {results.map((image) => (
              <Image key={image.id} image={image} />
            ))}
          </div>
        </div>

        {search && (
          <Pagination page={page} setPage={setPage} total={totalPages} />
        )}
      </div>
    </section>
  );
}

export default Home;
