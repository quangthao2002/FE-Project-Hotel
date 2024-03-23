import  { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunction'


const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    
    const[roomTypes, setRoomTypes] = useState([""])
    const[newRoomType,setNewRoomType] = useState("")
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)

    useEffect(() =>  {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, []) // empty array to run only once
    const handleNewRoomTypeInputChange = (e) => {
            setNewRoomType(e.target.value)
    }
    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){ //if newRoomType is not empty
            setRoomTypes([...roomTypes,newRoomType])
            setShowNewRoomTypeInput(false)
            setNewRoomType("")
        }
    }
  return (
    <>
       {roomTypes.length >= 0 && (
        <div>
        <select
            className='form-control'
            id='roomType'
            name='roomType'
            value={newRoom.roomType}
            onChange={e =>{
                if(e.target.value === "Add new"){
                    setShowNewRoomTypeInput(true)
                }else{
                    handleRoomInputChange(e) 
                }
            }} // handleRoomInputChange from AddRoom.jsx
        >
            <option value={""}>Select a room type</option>
            <option value={"Add new"}>Add new</option>
            {roomTypes.map((roomType,index)=>(
                   <option key={index} value={roomType}>{roomType}</option>
            ))}
        </select>
            {showNewRoomTypeInput && (
                <div className='input-group mt-1'>

                    <input 
                     className='form-control'
                     type='text'
                     placeholder='Enter new room type'
                     onChange={handleNewRoomTypeInputChange}
                    />
                    <button
                        className='btn btn-hotel'
                        onClick={handleAddNewRoomType}
                        type='button'
                    >Add</button>
                </div>
            )}

        </div>
       )}
    </>
  )
}

export default RoomTypeSelector
