import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { ShopContext } from '../context/ShopContext';

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);

  // Filter related products based on the category and slice the first 4 products
  const relatedProducts = products.filter(product => product.category === category).slice(0, 4);

  return (
    <div className="related-products-container my-10">
      <h3 className="text-2xl font-bold mb-5">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="related-product-item border p-4 rounded-lg shadow-lg">
            <img 
              src={product.image[0]} 
              alt={product.name} 
              className="h-48 w-full object-cover mb-3" 
            />
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <button className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all">
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
