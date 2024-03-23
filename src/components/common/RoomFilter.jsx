import React, { useState } from 'react'

const RoomFilter = ({data,setFilteredData}) => {
    const [filter,setFilter] = useState("")
    const handleSelectChange = (e) => {
      const selectedRomtype = e.target.value
      setFilter(selectedRomtype)
      const filteredRoms  = data.filter((room) => room.roomType.toLowerCase(). 
      includes(selectedRomtype.toLowerCase()))
      setFilteredData(filteredRoms)
    }

    const handleClearFilter = () => {
      setFilter("")
      setFilteredData(data)
    }
    const romTypes = [...new Set(data.map((room) => room.roomType))] 
  return (
    <div className='input-group mb-3'>
      <span className='input-group-text'>Filter rooms by type </span>
        <select className='form-select' value={filter} onChange={handleSelectChange}>
            <option value="">All</option>
            {romTypes.map((type,index) => {
              return <option key={index} value={type}>{type}</option>
            })}
        </select>
      <button className="btn btn-hotel" type='button' onClick={handleClearFilter}>Clear Filter</button> 
    </div>
  )
}

export default RoomFilter
