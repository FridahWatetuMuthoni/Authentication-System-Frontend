import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUser, getImages } from "./api";

const useUser = (id) => {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUser(id),
  });
};

const useImages = (page, search) => {
  return useQuery({
    queryKey: ["images", { page, search }],
    queryFn: () => getImages(page, search),
    placeholderData: keepPreviousData,
  });
};

export { useUser, useImages };
