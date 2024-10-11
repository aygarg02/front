import React, { useEffect, useState } from 'react';
import './Rfmid.css';
import Loader from './Loader';
import homeImage from '../static/public/down.png';
import Ske from './Ske';
const Rfmid = () => {
    const [data, setData] = useState({});
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [placeholderVisible, setPlaceholderVisible] = useState(null);
    const [part, setPart] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
      
                // Use Localtunnel URL
                const response = await fetch('https://jpvc91vn-8080.inc1.devtunnels.ms/api/images/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const loadImagesForKey = async (key) => {
        setFetching(true);
        setPlaceholderVisible(key);

        const imageArray = data[key];
        const limitedImages = imageArray.slice(0, 10);
        const imagePromises = limitedImages.map(image =>
            fetch(`https://jpvc91vn-8080.inc1.devtunnels.ms/api/images/home?imageUrl=${encodeURIComponent(image.path)}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Image fetch failed');
                    }
                    return res.blob();
                })
                .then(blob => URL.createObjectURL(blob))
        );

        try {
            const imageUrls = await Promise.all(imagePromises);
            setImages((prevImages) => ({ ...prevImages, [key]: imageUrls }));
        } catch (error) {
            setError(error.message);
        } finally {
            setPlaceholderVisible(null);
            setFetching(false);
        }
    };

    if (loading) return <div><Ske/></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Fetched Images</h1>

            <div className="button-container">
                {Object.keys(data).map((key, index) => (
                    <div key={index} className="button-wrapper">
                        <button onClick={() => { setPart(key); loadImagesForKey(key); }}>
                            <center> Load Images for {key} </center>
                            <img className="button-icon" src={ homeImage } alt="Arrow Icon" style={{ filter: 'brightness(0) invert(1)' }} />
                        </button>
                        
                        {placeholderVisible === key && <div className="placeholder"><Loader /></div>}
                        
                        {part === key && (
                            <div className="image-container">
                                {images[key]?.map((src, idx) => (
                                    <img key={idx} src={src} alt={`Fetched from API ${idx}`} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {fetching && <div className="loading-message">Loading more images...</div>}
        </div>
    );
};

export default Rfmid;
