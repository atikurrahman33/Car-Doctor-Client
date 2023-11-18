import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const BookService = () => {


    const service = useLoaderData();
    const { title,price ,_id,img} = service
    const {user}=useContext(AuthContext)

    const handleBook = event =>{
        event.preventDefault()
        const form = event.target;
        const date = form.date.value;
        const name = form.name.value; 
        const email =user?.email       
        const order={
            customarName:name,
            email,
            date,
            img,
            service:title,
            service_id: _id,
            price: price,


        }
        console.log(order)

        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                "content-type":'Application/json'
            },
            body:JSON.stringify(order)
        })
      .then(response => response.json())
      .then(data =>{
        console.log(data)
        if(data.insertedId){
            alert('service book successfully')
            form.reset()
        }
      })
    }
    return (
       <div>
        <h2 className="text-center font-bold text-4xl text-orange-500">Book Service: {title}</h2>
         <div>
            <form onSubmit={handleBook}>
             <div>
             <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name="date" className="input input-bordered" required />

                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Amount</span>
                    </label>
                    <input type="text" name="price" defaultValue={ `$`+ price} className="input input-bordered" required />

                </div>
                <div className="form-control mt-6">
                  <input className="btn btn-primary btn-block" type="submit" value="Confirm Order" />
                </div>
             </div>
            </form>
        </div>
       </div>
    );
};

export default BookService;