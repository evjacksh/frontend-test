import './listElementInfo.css'

const ListElementInfo = ({airline,arrivalAirport,arrivalCity,arrivalDate,departureAirport,departureCity,departureDate}) => {

    const correctTime = (time) => {
        let result = ''
        if(time >= 0 && time <= 9){
            result = `0${time}`
        } else{
            result = time
        }
        return result
    }

    const checkUndefined = (city) => {
        let result = ''
        if(city !== undefined){
            result = city.caption + ','
        }
        return result
    }

    const depDate = new Date(departureDate)
    const arrDate = new Date(arrivalDate)

    const depHours = correctTime(depDate.getHours())
    const depMinutes = correctTime(depDate.getMinutes())
    const arrHours = correctTime(arrDate.getHours())
    const arrMinutes = correctTime(arrDate.getMinutes())


    const totalGetTime = (arrDate.getTime() - depDate.getTime()) / (1000 * 60 * 60)
    const totalHours = Math.round(totalGetTime)
    const totalMinutes = Math.abs(Math.round((totalGetTime - totalHours) * 60))

    const dateFormat = (date) => {
        const months = ['янв.','фев.', 'мар.','апр.','май','июн.','июл.','авг.','сен.','окт.','ноя.','дек.']
        const weekDays = ['вс','пнд','вт','ср','чт','пт','сб']
        
        const weekDay = weekDays[date.getDay()]
        const month = months[date.getMonth()]
        const day = date.getDate()

        return `${day} ${month} ${weekDay}`
    }

    const total = () => {
        let result = ''
        if(totalHours > 0) {result = `${totalHours} ч`}
        if(totalMinutes > 0) {result += ` ${totalMinutes} мин`}
        return <>{result}</>
    }

    return (
    <div className="list_element_info">
        <div className="element_info_way">
            <p> {checkUndefined(departureCity)} {departureAirport.caption} <span className="info_way_airport">({departureAirport.uid})</span> <span className="info_way_arrow">→</span> {checkUndefined(arrivalCity)} {arrivalAirport.caption} <span className="info_way_airport">({arrivalAirport.uid})</span></p>
        </div>
        <div className="element_info_line"></div>
        <div className="element_info_time">
            <p className="info_time_takeoff">{depHours}:{depMinutes} <span className='time_takeoff_date'>{dateFormat(depDate)}</span></p>
            <p className="info_time_total">⌚ {total()} </p>
            <p className="info_time_arrival"><span className='time_arrival_date'>{dateFormat(arrDate)}</span> {arrHours}:{arrMinutes}</p>
        </div>
        <div className="element_info_stops_block">
            <div className="stops_block_line"></div>
            <p className="stops_block_info">1 пересадка</p>
            <div className="stops_block_line"></div>
        </div>
        <div className="element_info_airlines">
            <p>Рейс выполняет: {airline.caption}</p>    
        </div>
    </div>
  )
}

export default ListElementInfo