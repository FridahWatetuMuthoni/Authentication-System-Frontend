import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Image({ image }) {
  return (
    <div className="group cursor-pointer relative">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <Link to={image.links.download}>Download</Link>
        </button>
      </div>
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.object,
};

export default Image;
