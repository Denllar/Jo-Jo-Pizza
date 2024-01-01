import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Pizza: React.FC = () => {
    const { id } = useParams();
    const [getPizza, setGetPizza] = React.useState<{
        imageUrl: '',
        title: '',
        compound: '',
    }>();
    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://aed4fd69a9cf3971.mokky.dev/pizzas/${id}`)
                setGetPizza(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPizza();
    }, [id])

    if (!getPizza) {
        return (
            <h3>Загрузка...</h3>
        )
    }

    return (
        <div className='container'>
            <div className='container-pizza'>
                <img src={getPizza.imageUrl} alt='pizzaImage' />
                <div className='container-pizza--info'>
                    <div className='container-pizza--info'>
                        <h2>{getPizza.title}</h2>
                        <p><span>Состав:</span> {getPizza.compound}</p>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to={"/Jo-Jo-Pizza/"} className="button button--outline button--add button--right go-back-btn">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <span>Вернуться назад</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Pizza