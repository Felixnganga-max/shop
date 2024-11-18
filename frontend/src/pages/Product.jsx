import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [size, setSize] = useState("")

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setMainImage(foundProduct.image[0]); // Set the first image as the main image initially
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleThumbnailClick = (image) => {
    setMainImage(image); // Update the main image when a thumbnail is clicked
  };

  return productData ? (
    <div className="flex flex-col gap-10 p-5">
      {/* Main Section */}
      <div className="flex flex-col sm:flex-row w-full gap-10">
        {/* Left Side: Thumbnails and Main Image */}
        <div className="sm:w-1/2 flex gap-5">
          {/* Thumbnail Column */}
          <div className="flex flex-col gap-3 w-1/4">
            {productData.image.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(img)}
                className="cursor-pointer w-full h-24 object-cover border hover:border-gray-500 transition"
              />
            ))}
          </div>

          {/* Main Image Column */}
          <div className="w-3/4 flex items-center justify-center border">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="sm:w-1/2">
          <h2 className="text-3xl font-semibold mb-3">{productData.name}</h2>
          <div className="text-2xl font-bold mb-5 text-gray-700">${productData.price}</div>
          <p className="text-lg text-gray-700 mb-5">{productData.description}</p>

          {/* Size Selection */}
          <div className="mb-5">
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-md hover:bg-gray-200 transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button onClick={() => addToCart(productData._id, size)} className="bg-gray-700 text-white py-2 px-5 rounded-lg hover:bg-gray-800 transition-all duration-300 mb-5">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabbed Section for Description and Reviews */}
      <div className="w-full mt-10">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({productData.reviews?.length || 0})
          </button>
        </div>

        <div className="p-5 border">
          {activeTab === 'description' ? (
            <p className="text-gray-700">
              {productData.longDescription || 'This is a detailed description of the product.'}
            </p>
          ) : (
            <div>
              {productData.reviews && productData.reviews.length > 0 ? (
                <ul>
                  {productData.reviews.map((review, index) => (
                    <li key={index} className="mb-2 border-b pb-2">
                      <p className="font-medium">{review.username}</p>
                      <p className="text-gray-600">{review.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available for this product.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Component */}
      <RelatedProducts category={productData.category} currentProductId={productId} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
