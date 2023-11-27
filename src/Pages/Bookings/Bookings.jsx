import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingsCard from "./BookingsCard";
import axios from "axios";


const Bookings = () => {
    const {user}=useContext(AuthContext);
    const[bookings, setBookings]= useState([])
    const url=  `http://localhost:5000/bookings?email=${user.email}`;

    useEffect(()=>{
      axios.get(url , {withCredentials:true})
      .then(res=>{
        setBookings(res.data)
      })
      //   fetch(url)
      // .then(response => response.json())
      // .then(data => setBookings(data))
    },[url]);

    const handleDelete = id =>{
        const proceed =confirm('are you sure you want to delete')
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:'DELETE'

            })
            .then(Response =>Response.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount >0){
                    alert('[Delete successfully')
                    const remaining = bookings.filter(bookings=> bookings._id !==id)
                    setBookings(remaining)
                }
            })
        }
    };

    const handleBookingConfirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
          method: 'PATCH',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify({status: 'confirm'})

        })
            .then(Response =>Response.json())
            .then(data =>{
                console.log(data)
                if(data.modifiedCount
                  > 0){
                  const Remaining = bookings.filter(bookings=> bookings._id !==id)
                  const update = bookings.find(bookings=> bookings._id === id)
                  update.status= 'confirm'
                  const newBooking=[update, ...Remaining]
                  setBookings(newBooking)
                   
                }
            })

    }
    return (

        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Service Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
                bookings.map(bookings=> <BookingsCard key={bookings._id} bookings={bookings} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}></BookingsCard>)
            }
           
            
          </tbody>
         
        </table>
      </div>




        
    );
};

export default Bookings;