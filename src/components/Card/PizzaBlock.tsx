import React from 'react';
import { useSelector } from 'react-redux';
import { setAddCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { CartType } from '../../redux/slices/cartSlice';
import { countCartSlice } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/hook';

export type PizzaBlockProps = {
    id: number, 
    title: string, 
    imageUrl: string, 
    price: number, 
    sizes: number[], 
    types: number[], 
    rating: number,
}

const Card: React.FC<PizzaBlockProps> = ({ id, title, imageUrl, price, sizes, types, rating }) => {
    const [activeSize, setActiveSize] = React.useState(0);
    const [activeType, setActiveType] = React.useState(0);
    const typeName = ['тоноке', 'традиционное'];
    const dispatch = useAppDispatch();
    const countCart = useSelector(countCartSlice(id));
    const addedCount = countCart ? countCart.count : 0;
    const item: CartType = {
        id,
        title,
        imageUrl,
        price,
        size: sizes[activeSize],
        type: typeName[activeType],
        count: 0,
        rating,
    }
    const onAdd = () => {
        dispatch(setAddCart(item));
    }

    return (
        <div className='pizza-block-wrapper'>
            <div className='pizza-block'>
                <Link to={"/pizza/" + id}>
                    <img className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza" />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((typeId, index) =>
                                <li key={index} onClick={() => setActiveType(index)} className={activeType === index ? "active" : ""}>
                                    {typeName[typeId]}
                                </li>
                            )
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((item, index) =>
                                <li key={index} onClick={() => setActiveSize(index)} className={activeSize === index ? "active" : ""}>
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price} руб.</div>
                    <div onClick={onAdd} className="button button--outline button--add">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white" />
                        </svg>
                        <span>Добавить</span>
                        {
                            addedCount > 0 && <i>{addedCount}</i>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;