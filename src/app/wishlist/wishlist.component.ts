import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../service/data-share.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allproducts:any = []

  constructor(private api:DataShareService){}

  ngOnInit(): void {
    this.getWishlistItems()

  }

  getWishlistItems(){
    this.api.getWishlistProductApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allproducts = res

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
      
  }

  removeItem(id:any){
    this.api.deleteWishlistItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getWishlistItems()
        this.api.getWishlistCount()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

  }

  addToCart(product:any){
    console.log(product);
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('Product added successfully to cart')
          this.removeItem(product._id)
          this.api.getCartCount()
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
