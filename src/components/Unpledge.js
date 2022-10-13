import { useState } from "react";
import { ethers } from "ethers";

import SupplyChain from '../artifacts/contracts/SupplyChain.sol/SupplyChain.json';
import "../App.css";

const supplyChainAddress = "";


function Unpledge() {

    const [UnpledgeFunc, setUnpledgeParams] = useState({
        shipId : "",
        containerId : "",
      })
  
  async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  
    async function UnpledgeShip() {
      if (!UnpledgeFunc.containerId  &&  !UnpledgeFunc.containerId) return;
  
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          supplyChainAddress, 
          SupplyChain.abi,
          signer
         );
  
         const transaction = await contract.UnpledgeShip(UnpledgeFunc.shipId,UnpledgeFunc.containerId);
         await transaction.wait();
        
      }
    }

    return (

<div class="container my-5 p-lg-5 w-50">
      <div class='col'>
         <div class="form-group justify-content-center mb-4">
            <form>     
                <label><h4>Ship ID</h4></label>
             <div class="input-group">
                <input 
                 type="text"
                 class="w-100"
                 placeholder="Enter Destination"
               onChange={(e) => setUnpledgeParams(e.target.value)}
               value={UnpledgeFunc.shipId}
               />
            </div>

            <label><h4 class="mt-3">Container ID</h4></label>
             <div class="input-group">
                <input 
                 type="text"
                 class="w-100"
                 placeholder="Enter Container ID"
               onChange={(e) => setUnpledgeParams(e.target.value)}
               value={UnpledgeFunc.containerId}
               />
            </div>

            <button
             type="submit"
             class="btn  btn-dark mt-5 w-100"
             onClick={UnpledgeShip}
            >
             Unpledge Ship
            </button>
            </form>
         </div>
      </div>
      </div>
  )
}

export default Unpledge