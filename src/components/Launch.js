import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from '../artifacts/contracts/SupplyChain.sol/SupplyChain.json';
import "../App.css";

const supplyChainAddress = "";


function Launch() {

    const [launchFunc, setLaunchParams] = useState({
        destination : "",    
        launchDate: "",
        arrivalDate: "",
      })
  


  async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  
    async function launchShip() {
      if (!launchFunc.destination && !launchFunc.launchDate && !launchFunc.arrivalDate) return;
  
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          supplyChainAddress, 
          SupplyChain.abi,
          signer
         );
  
         const transaction = await contract.launchShip(launchFunc.destination,launchFunc.launchDate,launchFunc.arrivalDate);
         await transaction.wait();
        
      }
    }
    

    return (

<div class="container my-5 p-lg-5 w-50">
      <div class='col'>
         <div class="form-group justify-content-center mb-4">
            <form>     
                <label><h4>Destination address of Ship</h4></label>
         <div class="input-group">
                <input 
                 type="text"
                 class="w-100"
                 placeholder="Enter Destination"
               onChange={(e) => setLaunchParams(e.target.value)}
               value={launchFunc.destination}
               />
            </div>
          <div class='input-group date  ' id='datetimepicker2'>
               <label><h5 class="mt-3">Launch Date of Ship</h5></label>
               <input 
               type="date"
               id="dest"
               placeholder="Destination of Ship "
               onChange={(e) => setLaunchParams(e.target.value)}
               value={launchFunc.launchDate}
               name="launchDate"
               class="w-100 "
                />
               <span class="input-group-addon">
               <span class="glyphicon glyphicon-calendar"></span>
               </span>
            </div>

            <div class='input-group date  ' id='datetimepicker2'>
               <label><h5 class="mt-3">Arrival Date of Ship</h5></label>
               <input 
               type="date"
               id="arrival"
               placeholder="Destination of Ship "
               onChange={(e) => setLaunchParams(e.target.value)}
               value={launchFunc.arrivalDate}
               name="arrivalDate"
               class="w-100 "
                />
               <span class="input-group-addon">
               <span class="glyphicon glyphicon-calendar"></span>
               </span>
            </div>
            <button
             type="submit"
             class="btn  btn-dark mt-5 w-100"
             onClick={launchShip}
            >
             Launch Ship
            </button>
            </form>
 
         </div>
      </div>
      </div>

      
  )
}

export default Launch;