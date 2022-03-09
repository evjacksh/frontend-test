import { useEffect, useState } from 'react'
import './filters.css'

const Filters = ({setUpperPrice, setUnderPrice,setSortName,setFilterName,setAirlineName}) => { 
  const [radioName, setRadioName] = useState('increase');
  const [checkboxFilterName,setCheckboxFilterName] = useState('')
  const [checkboxAirlineName,setCheckboxAirlineName] = useState('')
  const [upperPriceFilters,setUpperPriceFilters] = useState(0)
  const [underPriceFilters,setUnderPriceFilters] = useState(1000000)

  useEffect(() => {
    setUpperPrice(+upperPriceFilters)
    setUnderPrice(+underPriceFilters)
    setSortName(radioName)
    setFilterName(checkboxFilterName)
    setAirlineName(checkboxAirlineName)
  },[upperPriceFilters,underPriceFilters,radioName,checkboxFilterName,checkboxAirlineName])

  return (
    <div className='settings'>
       <div className="settings_inner">
        <div className="settings_sort">
              <h3>Сортировать</h3>
              <p>
                <input 
                  type="radio" 
                  name="radio-1" 
                  value="decrease" 
                  onChange={() => 
                    setRadioName("increase")}
                  checked={radioName === "increase"} 
                /> 
                  - по возрастанию цены
              </p> 
              <p>
                <input 
                  type="radio" 
                  name="radio-1" 
                  value="decrease" 
                  onChange={() => 
                    setRadioName("decrease")}
                  checked={radioName === "decrease"} 
                /> 
                  - по убыванию цены
              </p> 
              <p>
                <input 
                  type="radio" 
                  name="radio-1" 
                  value="flightTime" 
                  onChange={() => 
                    setRadioName("flightTime")}
                  checked={radioName === "flightTime"} 
                /> 
                  - по времени полета
              </p> 
          </div>
          <div className="settings_filters">
              <h3>Фильтровать</h3>
              <p><input type="checkbox" value="oneStop" onChange={() => setCheckboxFilterName(checkboxFilterName === 'oneStop' ? '' : 'oneStop' )} checked={checkboxFilterName === "oneStop"}/> - 1 пересадка</p> 
              <p><input type="checkbox" value="noStop" onChange={() => setCheckboxFilterName(checkboxFilterName === 'noStop' ? '' : 'noStop')} checked={checkboxFilterName === "noStop"}/> - без пересадок</p> 
          </div>
          <div className="settings_price">
              <h3>Цена</h3>
              <p>От <input type="text" value={upperPriceFilters} onChange={(e) => setUpperPriceFilters(e.target.value)}/></p> 
              <p>До <input type="text" value={underPriceFilters} onChange={(e) => setUnderPriceFilters(e.target.value)}/></p> 
          </div>
          <div className="settings_companies">
              <h3>Авиакомпании</h3>
              <p><input type="checkbox" value="LOT" onChange={() => setCheckboxAirlineName(checkboxAirlineName === "LOT" ? '' : "LOT" )} checked={checkboxAirlineName === "LOT"}/> - LOT Polish Airlines <span>от 21049 р.</span></p> 
              <p><input type="checkbox" value="Аэрофлот" onChange={() => setCheckboxAirlineName(checkboxAirlineName === "Аэрофлот" ? '' : "Аэрофлот" )} checked={checkboxAirlineName === "Аэрофлот"}/> - Аэрофлот -рос... <span>от 31733 р.</span></p> 
          </div> 
        </div>
    </div>
  )
}

export default Filters