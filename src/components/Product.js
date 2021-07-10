import './Product.css'

import { Link } from 'react-router-dom';



const Product = ({ imageUrl, name, price, decscription, productId }) => {
    return (
        <div className="product">
            <img src={imageUrl}
                alt={name} />
            <div className="product__info">
                <p className="product__name">{name}</p>
                <p className="info_description">{decscription}</p>
                <p className="info__price">₹{price}</p>
                {/* <p className="info__price">{productId}</p> */}
                <Link to={"/product/"+productId} className="info__button">View Product</Link>
            </div>
        </div>
    );
};

export default Product;