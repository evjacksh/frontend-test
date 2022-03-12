import {useEffect, useState} from 'react'
import ListElementInfo from '../listElementInfo/ListElementInfo'
import './searchListElement.css'

const SearchListElement = ({legs,price,carrier}) => {
    const [flightInfo,setFlightInfo] = useState({...legs})
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        if(legs[0].segments.length === 2){
            setFlightInfo({...legs[0].segments})
            setLoading(false)
        } else if(legs[0].segments.length === 1 && legs[1].segments.length === 2){
            setFlightInfo({...legs[1].segments})
            setLoading(false)
        }
    },[legs])

    return (
            loading ? null : 
            <ListElement {...{
                price: price.total.amount,
                carrier: carrier.caption,
                flightInfo,
                loading
            }} />        
    )
}

const ListElement = ({price, carrier, flightInfo, loading}) => {
    return(
        <div className="list_element">
            <div className="list_element_info_header">
                <div className="info_header_logo">{carrier}</div>
                <div className="info_header_price">
                    <span className="header_price_block">{price} ₽</span>
                    <span>Стоимость для одного взрослого пассажира</span>  
                </div>
            </div>
            {loading ? 'loading...' : <ListElementInfo {...flightInfo[0]}/>}
            <div className="list_element_line"></div>
            {loading ? 'loading...' : <ListElementInfo {...flightInfo[1]}/>}
            <button>ВЫБРАТЬ</button>
        </div>
    )
}

export default SearchListElement