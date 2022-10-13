import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from '../artifacts/contracts/SupplyChain.sol/SupplyChain.json';
import "../App.css";

const supplyChainAddress = "";

function Buy() {

const [buyFunc, setBuyParams] = useState({
      shipId : "",    
      containerId: "",
})

async function requestAccount() {
    if(!buyFunc.shipId && !buyFunc.containerId) return;
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function buyContainer() {
    if (!buyFunc.shipId && !buyFunc.containerId) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        supplyChainAddress, 
        SupplyChain.abi,
        signer
       );

       const transaction = await contract.buyContainer(buyFunc.shipId,buyFunc.containerId);
       await transaction.wait();
       
    }
  }
  
  return (
<div class="container my-5 p-lg-5 w-50">
 <div class='col'>
  <div class="form-group justify-content-center mb-4">
     <div class="row">
       <form>
         <label>  <h4> Ship ID </h4> </label>    
             <input
              type="text"
              placeholder="Ship ID"
              onChange={(e) => setBuyParams(e.target.value)}
              value={buyFunc.shipId}
              name="shipId"
              class="w-100"
             />
          <label> <h4> Container ID </h4> </label>
           <input
             type="text"
             placeholder="Container ID"
             onChange={(e) => setBuyParams(e.target.value)}
             value={buyFunc.containerId}
             name="containerId"
             class="w-100"
           />
           <button
            type="submit"
            class="btn btn-dark"
            onClick={buyContainer} >
          Buy Container
          </button>
      </form>
     </div>
   </div>
 </div>
</div>
  )
}

export default Buy;