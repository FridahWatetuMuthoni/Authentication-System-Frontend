import {
  registerUser,
  loginUser,
  logoutUser,
  getNewAccesToken,
  updateUser,
} from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const useRegister = () => {
  return useMutation({
    mutationFn: (user) => registerUser(user),
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: (user) => loginUser(user),
  });
};

const useLogout = () => {
  const axiosCall = useAxios();
  return useMutation({
    mutationFn: (refresh_token) => logoutUser(refresh_token, axiosCall),
  });
};

const useAccessToken = () => {
  return useMutation({
    mutationFn: (refresh_token) => getNewAccesToken(refresh_token),
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateUser(user),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
  });
};

export { useRegister, useLogin, useLogout, useAccessToken, useUpdateUser };
