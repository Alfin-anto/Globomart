import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../service/data-share.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProduct:any = []
  total:number = 0

  constructor(private api:DataShareService){}

  ngOnInit(): void {
    this.getCartItem()
  }

  getCartItem(){
    this.api.getCartItemApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProduct = res
        this.getTotalPrice()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeCartItem(id:any){
    this.api.removeCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCartItem()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
        alert('Something went wrong')
        
      }

    })

  }

  emptyCart(){
    this.api.emptyCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCartItem() 
        this.api.getCartCount()       
      },
      error:(err:any)=>{
        console.log(err);
        alert('Something went wrong')
        
      }
    })
}

incrementItem(id:any){
  this.api.incrementCartItem(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getCartItem()
      this.api.getCartCount()
    },
    error:(err:any)=>{
      console.log(err);
    }

  })
}

decrementItem(id:any){
  this.api.decrementCartItem(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getCartItem()
      this.api.getCartCount()
    },
    error:(err:any)=>{
      console.log(err);
    }

  })
}

getTotalPrice(){
  this.total = Math.ceil(this.allProduct.map((item:any)=>item.grandTotal).reduce((n1:any, n2:any)=>n1+n2))
  //The Math.ceil() static method always rounds up and returns the smallest integer greater than or equal to a given number.
  console.log(this.total);
  
}

checkout(){
  sessionStorage.setItem("total",JSON.stringify(this.total))
}




}