import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PhotoCard from "../components/Photocard.jsx";
import "../App.css"


const UNSPLASH_API_URL = "https://api.unsplash.com/photos";


const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(UNSPLASH_API_URL, {
        params: { page, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,

        },
      });
      setPhotos((prev) => [...prev, ...response.data]);
    } catch (err) {
      setError("Failed to fetch photos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const lastPhotoRef = useRef();
  useEffect(() => {
    if (lastPhotoRef.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prevPage) => prevPage + 1);
      },
      { threshold: 1.0 }
    );
    if (lastPhotoRef.current) observer.current.observe(lastPhotoRef.current);
  }, [photos]);

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  return (
    <div>
      <div className="gallery">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            ref={index === photos.length - 1 ? lastPhotoRef : null}
          />
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Gallery;
