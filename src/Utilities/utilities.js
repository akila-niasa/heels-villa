const getItemCard=()=>{
  return JSON.parse( localStorage.getItem("shopping-cart"))
}

const setItemCard=(id)=>{
    let shopping_cart={}
    let exist=getItemCard()
    console.log(exist);
    if(!exist){
        shopping_cart[id]=1
    }
    else{
        
        shopping_cart=exist
        let quantity=shopping_cart[id]
        if(quantity){
            shopping_cart[id]=  quantity+1
        }
        else{
            shopping_cart[id]=1
        }
           
       
    }
    localStorage.setItem('shopping-cart',JSON.stringify(shopping_cart))
}
const clearLocalStorage = () => {
    localStorage.removeItem("shopping-cart");
  };
export{getItemCard,setItemCard,clearLocalStorage}