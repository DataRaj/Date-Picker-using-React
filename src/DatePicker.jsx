import { addMonths, eachDayOfInterval, format, startOfMonth, startOfWeek ,endOfWeek,isSameMonth, endOfMonth, isSameDay, isToday} from 'date-fns';
import './styles.css'
import { useState } from 'react';


export default function DatePicker({value,onChange}){
  const [open,isOpen] = useState(false);
 
  
    return (
        <>
        <div className="date-picker-container">
      <button className="date-picker-button" 
      onClick={()=>isOpen(o=>!o)}>
        {value == null ? "Select a Date" : format(value, "MMM do, yyyy")}
        </button>
      {open && <DatePickerModal onChange={onChange} value={value}/>}
    </div>
        </>
    )
}


function DatePickerModal({value, onChange}){
  const [visibleMonth ,setVisibleMonth] = useState(value || new Date())

  const visibleDates = eachDayOfInterval({
    start :startOfWeek(startOfMonth(visibleMonth)),
    end : endOfWeek(endOfMonth(visibleMonth)),
  });
   
  function showPrevMonth(){
    setVisibleMonth(currMonth=>{
      return addMonths(currMonth,-1)
    })
  }

  function showNextMonth(){
    setVisibleMonth(currMonth=>{
      return addMonths(currMonth ,1)
    })
  }


  return (
    <div className="date-picker">
        <div className="date-picker-header">
          <button className="prev-month-button month-button" onClick={showPrevMonth} onKeyDown={showPrevMonth}>&larr;</button>
          <div className="current-month">{format(visibleMonth,'MMMM, yyyy')}</div>
          <button className="next-month-button month-button" onClick={showNextMonth} onKeyUp={showNextMonth}>&rarr;</button>
        </div>
        <div className="date-picker-grid-header date-picker-grid">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="date-picker-grid-dates date-picker-grid">
          {visibleDates.map(d =>(
              <button className={`date ${!isSameMonth(d,visibleMonth) && 
                "date date-picker-other-month-date"} ${isSameDay(d,value) &&
                 "selected"} ${isToday(d) && isSameMonth(d,visibleMonth) && 'today'}`} key={d.toDateString()} onClick={()=>onChange(d)}>
              {d.getDate()}
              </button>
          ))}

        </div>
      </div>
  )
}