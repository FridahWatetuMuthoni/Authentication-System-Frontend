import { useQuery } from "@tanstack/react-query";
import { getUser, getImages } from "./api";

const useUser = (id) => {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: () => getUser(id),
  });
};

const useImages = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });
};

export { useUser, useImages };
