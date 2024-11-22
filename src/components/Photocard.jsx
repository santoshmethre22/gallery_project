import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const PhotoCard = forwardRef(({ photo }, ref) => (
  <div className="photo-card" ref={ref}>
    <img
      src={photo.urls.small}
      alt={photo.alt_description || "Unsplash Image"}
      loading="lazy"
      className="photo"
    />
    <p className="caption">{photo.user.name}</p>
  </div>
));

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PhotoCard;
