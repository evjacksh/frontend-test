import Filters from './components/filters/Filters'
import SearchList from './components/searchList/SearchList';
import {useState} from 'react'
import './App.css'
const json = require('./flights.json')


function App() {
  const [underPrice,setUnderPrice] = useState(null)
  const [upperPrice,setUpperPrice] = useState(null)
  const [sortName, setSortName] = useState(null);
  const [filterName,setFilterName] = useState(null)
  const [airlineName,setAirlineName] = useState(null)


  return (
    <div className="App">
      <Filters 
        setUnderPrice={e => setUnderPrice(e)} 
        setUpperPrice={e => setUpperPrice(e)} 
        setSortName={e => setSortName(e)} 
        setFilterName={e => setFilterName(e)}
        setAirlineName={e => setAirlineName(e)} 
      />
      <SearchList 
        {...json} 
        upperPrice={upperPrice} 
        underPrice={underPrice} 
        sortName={sortName} 
        filterName={filterName} 
        airlineName={airlineName} 
      />
    </div>
  );
}

export default App;
