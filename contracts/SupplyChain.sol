// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SupplyChain{


    address payable owner;
    uint public shippingCost;
    uint public shipCounter;
    uint public containerCounter;
    address[] public Chain ;


    constructor() { 
        owner = payable(msg.sender);
        Chain.push(owner);
    }

     struct Ship{
        string destination;
        uint launchDate;
        uint arrivalDate;
      }

     struct Container{
        address seller;
        uint weight;
        uint price;
        bool sold;
        bool locked;  
    }

    modifier OnlyOwner{
        require(msg.sender == owner, "You dont have the permission");
        _;
    }

    mapping(uint => Ship) public Ships;
    mapping(uint => mapping(uint => Container)) public Containers;

  function launchShip(
         string memory _destination,
         uint _launchDate,
         uint _arrivalDate
   ) public OnlyOwner{
        require(_launchDate >= block.timestamp  && _arrivalDate > _launchDate, "enter valid date");
        
      Ships[shipCounter] = Ship({
            destination : _destination,
            launchDate : _launchDate,
            arrivalDate : _arrivalDate
       });

        shipCounter++;
      
    }

  function pledgeContainer(
    uint _shipId,
    address _seller,
    uint _weight,
    uint _price
   ) public{
        
       Containers[_shipId][containerCounter] = Container({
            seller : _seller,
            weight : _weight,
            price  : _price,
            sold : false,
            locked : true
       });

       containerCounter+=1;
     
   }
   
    function buyContainer(
        uint _shipId,
        uint _containerId
    ) payable public {
        Container storage container = Containers[_shipId][_containerId];
        require(msg.value == container.price,"Not enough");
        payable(container.seller).transfer(container.price);
        container.sold = true;

    }
    
     function unPledgeContainer (
         uint _shipId,
         uint _ContainerId
     ) external  OnlyOwner{
         Container storage container = Containers[_shipId][_ContainerId];
         require(container.sold, "You had to Pay the owner for open Lock"); 
         shippingCost =  container.weight / 40;
         owner.transfer(shippingCost);
         container.locked = false;
         
    }
}