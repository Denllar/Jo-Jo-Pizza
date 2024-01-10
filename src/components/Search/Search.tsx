import React from 'react'
import debounce from 'lodash.debounce'
import style from './Search.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);  
  const {searchValue} = useAppSelector(state=>state.filterReducer)
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    if (inputRef.current){
      inputRef.current.focus();
    }
  }

  const testDebounce = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 800), []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
    testDebounce(event.target.value);
  }
  return (
    <div className={style.root}>
      <input ref={inputRef} onChange={onChangeInput} value={searchValue} placeholder='Поиск пиццы...' />
      {
        searchValue && <img onClick={onClickClear} width={18} src="./img/clear.svg" alt='clear' />
      }
    </div>
  )
}
export default Search;