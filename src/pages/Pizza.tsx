import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { setAddCart } from '../redux/slices/cartSlice';
import { countCartSlice } from '../redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';

const Pizza: React.FC = () => {
    const { id } = useParams();
    const [getPizza, setGetPizza] = React.useState<{
        title: '',
        imageUrl: '',
        compound: '',
        id: number,
        price: number,
        sizes: number[],
        types: string,
        count: number,
        rating: number,
    }>();
    const countCart = useAppSelector(countCartSlice(Number(id)));
    const addedCount = countCart ? countCart.count : 0;
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector(state => state.cartSlice);
    const typeName = ['тоноке', 'традиционное'];

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://aed4fd69a9cf3971.mokky.dev/pizzas/${id}`)
                setGetPizza(data);
                return data;
            } catch (error) {
                console.error(error);
            }
        }
        fetchPizza();
    }, [id])

    console.log(getPizza);

    const item = {
        id: getPizza?.id,
        title: getPizza?.title,
        imageUrl: getPizza?.imageUrl,
        price: getPizza?.price,
        size: getPizza?.sizes[0],
        type: "тонкое",
        count: 0,
        rating: getPizza?.rating,
    }


    const isMounted = React.useRef(false);
    React.useEffect(() => {
        if (isMounted.current) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        isMounted.current = true;
    }, [cart])


    if (!getPizza) {
        return (
            <h3>Загрузка...</h3>
        )
    }

    return (
        <div className='container'>
            <div className='container-pizza'>
                <img src={getPizza.imageUrl} alt='pizzaImage' />
                <div className='container-pizza--infoBtn'>
                    <div className='container-pizza--infoBtn--info'>
                        <h2>{getPizza.title}</h2>
                        <p><span>Состав:</span> {getPizza.compound}</p>
                    </div>
                    <div className='container-pizza--infoBtn--btn'>
                        <div onClick={() => dispatch(setAddCart(item))} className="button button--outline button--add pizzaAdd">
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
                        <div className="cart__bottom-buttons pizzaBack">
                            <Link to={'/Jo-Jo-Pizza/'} className="button button--outline button--add button--right go-back-btn">
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span>Вернуться назад</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Pizza