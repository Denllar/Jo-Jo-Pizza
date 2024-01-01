import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveIndex } from '../redux/slices/filterSlice';
import { selectFilter } from '../redux/slices/filterSlice';

const Categories: React.FC = () => {
    const activeIndex = useSelector(selectFilter);
    const dispatch = useDispatch();
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые",
    ]
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) =>
                        <li key={index} onClick={() => dispatch(setActiveIndex(index))} className={activeIndex === index ? "active" : ""}>
                            {item}
                        </li>)
                }
            </ul>
        </div>
    );
}

export default Categories;