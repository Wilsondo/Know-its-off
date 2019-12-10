import React from 'react'

const Appliances = ({appliances}) => {
    return (
        <div>
            <center><h1>My appliances</h1></center>
            {appliances.map((appliance) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{appliance.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{appliance.type}</h6>
                        <samp class="card-text">{appliance.status ? "ON" : "OFF"}</samp>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Appliances
