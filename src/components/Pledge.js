import { useState } from "react";
import { ethers } from "ethers";
import SupplyChain from '../artifacts/contracts/SupplyChain.sol/SupplyChain.json';
import "../App.css";

const supplyChainAddress = "";


function Pledge() {

    const [PledgeFunc, setPledgeParams] = useState({
        shipId : "",
        seller : "",
        weight : "",
        price : "",
      })
  


  async function requestAccount() {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  
    async function PledgeShip() {
  
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          supplyChainAddress, 
          SupplyChain.abi,
          signer
         );
  
         const transaction = await contract.PledgeShip(PledgeFunc.shipId,PledgeFunc.seller,PledgeFunc.weight,PledgeFunc.price);
         await transaction.wait();
        
      }
    }
    

    return (

<div class="container my-5 p-lg-5 w-50">
      <div class='col'>
         <div class="form-group justify-content-center mb-4">
          <form>
                <label><h4>Ship Id</h4></label>
                <input 
                 type="text"
                 class="w-100"
                 placeholder="Ship Id"
                 onChange={(e) => setPledgeParams(e.target.value)}
                 value={PledgeFunc.shipId}
               />

               <label><h4 class="mt-3">Seller</h4></label>
               <input 
                id="dest"
                type="text"
                placeholder="Seller"
                onChange={(e) => setPledgeParams(e.target.value)}
                value={PledgeFunc.seller}
                name="Seller"
                class="w-100 "
                />
                
               <label><h5 class="mt-3">Weight</h5></label>
               <input 
                type="text"
                id="arrival"
                placeholder="Weight"
                onChange={(e) => setPledgeParams(e.target.value)}
                value={PledgeFunc.weight}
                name="weight"
                class="w-100 "
                />

            
               <label><h5 class="mt-3">Price</h5></label>
               <input 
                type="text"
                placeholder="Price"
                onChange={(e) => setPledgeParams(e.target.value)}
                value={PledgeFunc.price}
                name="price"
                class="w-100"
                />
            <button
             type="submit"
             class="btn  btn-dark mt-5 w-100"  
             onClick={PledgeShip}
            >
             Pledge Ship
            </button>
            </form>
            </div>
          </div>
          </div>


  )
}

export default Pledge