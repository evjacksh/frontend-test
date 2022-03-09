import { useEffect, useState} from 'react'
import SearchListElement from '../searchListElement/SearchListElement'
import './searchList.css'

const SearchList = ({result, underPrice, upperPrice,sortName,filterName,airlineName}) => {
    const flights = result.flights
    const PAGE_SIZE = 25
    const showMoreButton = document.querySelector('.list_show_more_button')
    

    const [part,setPart] = useState(0)
    const [visibleData , setVisibleData] = useState ([])

    const airlineNameFilter = (list,airlnine) => {
      let newList = list.map(elem => ({
        price: elem.flight.price.total.amount,
        token: elem.flightToken,
        depDate: new Date(elem.flight.legs[0].segments[0].departureDate).getTime(),
        arrDate: new Date(elem.flight.legs[0].segments[0].arrivalDate).getTime(),
        caption: elem.flight.carrier.caption
      }))

      let result = []

      if(airlnine !== ''){
         result = newList.filter(elem => {
          let text = elem.caption.toLowerCase().split(' ')
          let check = airlnine.toLowerCase()
  
          if(text.indexOf(check) !== -1){
            return elem
          }
        })

      } else{
        result = newList
      } 
      return result
    }

    const sortNames = (sort,newList) => {
        let result = []

        const increase = (list) => {
          result = list.sort((a,b) => a.price - b.price)
        }

        const decrease = (list) => {
          result = list.sort((a,b) => b.price - a.price)
        }

        const flightTime = (list) => {
          result = list.sort((a,b) => (a.arrDate - a.depDate) - (b.arrDate - b.depDate))
        }

      switch(sort){
        case 'increase':
          increase(newList)
          break;
        case 'decrease':
          decrease(newList)
          break;
        case 'flightTime':
          flightTime(newList)
          break;
        default:
          break;
      }
      return result
    }

    useEffect(() => {
      const numberOfItems = PAGE_SIZE * ( part + 1 ); 
      const newArray = []; 

      const currentItems = flights.filter(elem => upperPrice < Number(elem.flight.price.total.amount) && Number(elem.flight.price.total.amount) < underPrice)
      const airlineNameSortItems = airlineNameFilter(currentItems,airlineName)
      const sortCurrentItems = sortNames(sortName,airlineNameSortItems).map(elem => {
        for (const el of currentItems) {
          if(elem.token === el.flightToken){
            return el
          }
        }
      })
      
      sortCurrentItems.forEach((elem,i) => {
        if (i < numberOfItems) {
          newArray.push(elem)
        }
      });
      
      setVisibleData(newArray);
      
      
  } , [part,flights,underPrice,upperPrice,sortName,airlineName])

  if(visibleData.length === flights.length){
    showMoreButton.classList.add('hide')
  }
  
  return (
    <div className="search_list">
      {visibleData.map(elem => <SearchListElement key={elem.flightToken} {...elem.flight} underPrice={underPrice} upperPrice={upperPrice}/>)}
      <button className='list_show_more_button' onClick={() => setPart(part + 1)}>Показать еще</button>
    </div>
  )
}

export default SearchList