import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUser, getImages } from "./api";

const useUser = (id) => {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUser(id),
  });
};

const useImages = (page, search) => {
  console.log(page);
  console.log(search);
  return useQuery({
    queryKey: ["images", { page, search }],
    queryFn: (page, search) => getImages(page, search),
    placeholderData: keepPreviousData,
  });
};

export { useUser, useImages };
