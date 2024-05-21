import PropTypes from "prop-types";

function Error({ error }) {
  return (
    <div className="bg-gray-100 px-2 text-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-extrabold text-red-500">500</h1>
        <p className="text-4xl font-medium text-gray-800">{error.message}</p>
        <p className="text-xl text-gray-800 mt-4">
          We apologize for the inconvenience. Please try again later.
        </p>
      </div>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string,
};

export default Error;
