import { useNavigate, Link } from "react-router-dom";
import Google from "./Google";
import Facebook from "./Facebook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../queries/mutations";
import useGlobalContext from "../../hooks/useGlobalContext";

const schema = z
  .object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    username: z.string().min(3),
    email: z.string().email(),
    password1: z
      .string({})
      .min(6, "Password must be at least 6 charaters long"),
    password2: z
      .string({})
      .min(6, "Password must be at least 6 charaters long"),
  })
  .refine(
    (data) => {
      console.log(data);
      return data.password1 === data.password2;
    },
    {
      message: "password1 and password2 must match",
      path: ["password2"],
    }
  );

function Register() {
  const navigate = useNavigate();
  const registerUser = useRegister();
  const { setAccessToken, setRefreshToken, setUserID } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser.mutateAsync(data);
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      setUserID(response.user.pk);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-full">
      {/* <!-------------------------------------------------------------------------------> */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  py-6 lg:px-8">
        <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm ">
          {/* text-gray-900 */}
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight ">
            Sign Up
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
          <form
            className="space-y-6 px-2 py-3"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 "
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  {...register("first_name")}
                  type="text"
                  autoComplete="first_name"
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {errors.first_name && (
                  <p className=" text-red-600 mt-2 text-sm">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 "
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  {...register("last_name")}
                  type="text"
                  autoComplete="last_name"
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {errors.last_name && (
                  <p className=" text-red-600 mt-2 text-sm">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </section>

            <section className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 "
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  {...register("username")}
                  type="text"
                  autoComplete="username"
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {errors.username && (
                  <p className=" text-red-600 mt-2 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {errors.email && (
                  <p className=" text-red-600 mt-2 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </section>

            <section className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <label
                  htmlFor="password1"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
                <input
                  id="password1"
                  name="password1"
                  {...register("password1")}
                  type="password"
                  autoComplete="password1"
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {errors.password1 && (
                  <p className=" text-red-600 mt-2 text-sm">
                    {errors.password1.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 "
                >
                  Confirm Password
                </label>
                <input
                  id="password2"
                  name="password2"
                  {...register("password2")}
                  type="password"
                  autoComplete="password2"
                  required
                  className="block text-gray-900 w-full rounded-md border-0 py-1.5 px-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                />
                {errors.password2 && (
                  <p className=" text-red-600 mt-2 text-sm">
                    {errors.password2.message}
                  </p>
                )}
              </div>
            </section>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "submiting data ..." : "Register"}
              </button>
            </div>
            <div>
              {errors.root && (
                <p className=" text-red-600 mt-2">{errors.root.message}</p>
              )}
            </div>
          </form>
          {/* text-gray-500 */}
          <section className="flex items-center justify-center text-content gap-2 w-full my-5 ">
            <hr className="w-26 md:w-32" />
            <p className=" text-sm">Or continue with </p>
            <hr className="w:26 md:w-32" />
          </section>
          <section className="flex flex-col md:flex-row items-center gap-2 w-full md:justify-around px-1">
            <Google />
            <Facebook />
          </section>
          <section className="flex flex-col md:flex-row items-center text-sm mt-6 justify-between gap-2 md:gap-2 ml-2">
            <section className="flex items-center">
              <span>Already have an account? </span>
              <Link
                to="/login/"
                className="font-semibold text-indigo-600 hover:text-indigo-500 ml-2"
              >
                Login
              </Link>
            </section>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Register;
