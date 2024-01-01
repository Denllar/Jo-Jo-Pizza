import React from 'react'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/Card/PizzaBlock";
import MyLoader from '../components/Card/Skeleton';

import { useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectFilter } from '../redux/slices/filterSlice';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const {sortId} = useAppSelector(state => state.filterReducer);
    const activeIndex = useSelector(selectFilter);
    const {searchValue} = useAppSelector(state=>state.filterReducer)

    const { items, status, invertBtn } = useAppSelector(state => state.pizzaSlice);
    const { cart } = useAppSelector(state => state.cartSlice)
    const isMounted = React.useRef(false);
    
    React.useEffect(() => {
        if (isMounted.current){
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        isMounted.current=true;
    }, [cart])

    React.useEffect(() => {
        dispatch(fetchPizzas({ activeIndex, sortId, invertBtn }));
    }, [activeIndex, sortId, invertBtn, searchValue]);

    const loadingPizzas = [...new Array(6)].map((_, i) => <MyLoader key={i} />);
    const finishLoadingPizzas = items
        .filter(item => item.title.toUpperCase().replace(' ', '').replace('-', '').includes(searchValue.toUpperCase().replace(' ', '').replace('-', '')))
        .map(item => (
            <PizzaBlock
                sizes={[]} types={[]} key={item.id}
                {...item} />
            )
        );
    
    
    return (
        <div>
            {
                status === 'error' ?
                    <div className='content__error'>
                        <h2>Магазин пуст <span>😕</span></h2>
                        <p>
                            К сожалению, не получилось загрузить питсы.<br />
                            Попробуйте повторить попытку позже.
                        </p>
                    </div> :
                    <div className="container">
                        <div className="content__top">
                            <Categories />
                            <Sort />
                        </div>
                        <h2 className="content__title">{searchValue.length>0 ? `Поиск по: ${searchValue}` : 'Все пиццы'}</h2>
                        <div className="content__items">
                            {
                                status === 'loading' ? loadingPizzas : finishLoadingPizzas
                            }
                        </div>
                    </div>
            }
        </div>

    )
}

export default Home;