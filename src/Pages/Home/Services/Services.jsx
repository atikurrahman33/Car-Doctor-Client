import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services1,setServices]=useState([]);

    useEffect(()=>{
        fetch("Services.json")
      .then(response => response.json())
      .then(data =>setServices(data) )

    },[])
    return (
        <div>
            <div className="text-center m-5">
                <h1 className="text-orange-600 text-2xl font-bold">Services</h1>
                <h1 className="text-5xl font-bold m-3">Our Service Area</h1>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services1.map(services1 => <ServiceCard 
                        key={services1._id}
                        services1={services1}
                    
                    ></ServiceCard>)
                }
            </div>
          
            
        </div>
    );
};

export default Services;