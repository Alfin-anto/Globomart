import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../service/data-share.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProducts:any=[]

  constructor(private api:DataShareService){}

  ngOnInit(): void {   
    this.api.getAllProduct().subscribe({
      next:(res:any)=>{
        this.allProducts = res
        console.log(this.allProducts);
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    }) 
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          alert('Product added successfully')
          
        },
        error:(err:any)=>{
          console.log(err);
          alert(err.error)  
          
        }
      })

    }
    else{
      alert('Please login to add product to wishlist')
    }

  }

  addToCart(product:any){
    console.log(product);
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartCount()
          alert('Product added successfully to cart')
        },
        error:(err:any)=>{
          console.log(err);
          alert('something went wrong')
          
        }
      })
    }
    else{
      alert('Please login')
    }
    
  }

}
