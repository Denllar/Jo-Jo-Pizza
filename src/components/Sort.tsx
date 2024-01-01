import React from 'react';
import { setSortId } from '../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setInvertBtn } from '../redux/slices/pizzaSlice';

type SortArrayItem = {
    name: string;
    sortProperty: string;
}

export default function Sort() {
    const dispatch = useAppDispatch();
    const { sortId } = useAppSelector(state => state.filterReducer);
    const [openSort, setOpenSort] = React.useState(false);
    const sortArray: SortArrayItem[] = [
        { name: 'популярности', sortProperty: 'rating' },
        { name: 'цене', sortProperty: 'price' },
        { name: 'алфавиту', sortProperty: 'title' },
    ];
    const openAndSendIndex = (obj: SortArrayItem) => {
        setOpenSort(false);
        dispatch(setSortId(obj));
    }
    const sortRef = React.useRef<HTMLDivElement>(null);

    // React.useEffect(()=>{

    //     // const handleClickOutsides = (event)=>{
    //     //     if (!event.path.includes(sortRef.current)){
    //     //         setOpenSort(false);
    //     //     }
    //     // }
    //     // document.body.addEventListener('click', handleClickOutsides)
    //     // return ()=>{
    //     //     document.body.removeEventListener('click', handleClickOutsides);
    //     // }
    // }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">

                <b>Сортировка по:</b>
                <span onClick={() => setOpenSort(prev => !prev)}>{sortId.name}</span>
                <button onClick={() => dispatch(setInvertBtn())} className="button button--outline button--circle button--invert">
                    ↓↑
                </button>
            </div>
            {
                openSort &&
                <div className="sort__popup">
                    <ul>
                        {
                            sortArray.map((obj, index) =>
                                <li key={index} onClick={() => openAndSendIndex(obj)} className={sortId.sortProperty === obj.sortProperty ? 'active' : ''}>
                                    {obj.name}
                                </li>
                            )
                        }
                    </ul>
                </div>
            }

        </div>
    )
}
