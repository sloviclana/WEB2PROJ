import React from "react";
import ReactDOM from "react";
import { GetAllSalesmans } from "../services/UserServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { AcceptRequest } from "../services/UserServices";
import { DenyRequest } from "../services/UserServices";

const Salesmans = () => {

    const navigate = useNavigate();
    const [salesmans, setSalesmans] = useState([]);
    //const data = GetAllSalesmans();
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await GetAllSalesmans();
            if (response) {
                setSalesmans(response.salesmanArray); // Set the fetched data to the state
            }
          } catch (error) {
            // Handle error
          }
        }
    
        fetchData();
      }, []);

      function reloadPage() {
        window.location.reload();
      }

      const acceptRequest = (salesmanEmail) => {
        
          try {
            const response = AcceptRequest(salesmanEmail);
            reloadPage();
            // Process the response here
          } catch (error) {
            // Handle error
            console.log(error);
          }
       
      };

      const denyRequest = (salesmanEmail) => {
       
            try {
              const response = DenyRequest(salesmanEmail);
              reloadPage();
            } catch (error) {
              // Handle error
              console.log(error);
            }
    
    };



      /* const renderActionsCell = (salesman) => {

        

        return (
            <td>
                {salesman.verificationStatus}
                <div className="buttons">
                    <button disabled = {!isProcessing} onClick={acceptRequest(salesman.email)}>Accept</button>
                    <button disabled = {!isProcessing} onClick={denyRequest(salesman.email)}>Deny</button>
                </div>
            </td>
        );
      } */
      

      

    return (

       <div className="card">
             <p>Here are all verification requests: </p>

             <table className="salesman-table">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Full name</th>
                    <th>Verification status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salesmans.map(salesman => (
                    <tr key={salesman.id}>
                        <td>{salesman.username}</td>
                        <td>{salesman.email}</td>
                        <td>{salesman.fullName}</td>
                        <td>
                        {salesman.verificationStatus}
                        </td>
                        <td>
                            <button disabled = {!(salesman.verificationStatus === "PROCCESSING")} onClick={() => acceptRequest(salesman.email)}>Accept</button>
                            <button disabled = {!(salesman.verificationStatus === "PROCCESSING")} onClick={() => denyRequest(salesman.email)}>Deny</button>
                        </td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>

             <button onClick={() => navigate(-1)}>Go Back</button>
       </div>

    );
}


export default Salesmans;