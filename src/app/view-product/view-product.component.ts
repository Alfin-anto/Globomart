import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../service/data-share.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:any = {}

  constructor(private api: DataShareService, private roter: ActivatedRoute) {}


  ngOnInit(): void {
    this.roter.params.subscribe((res: any) => {
      const id = res.id
      console.log(id);
      this.getAProduct(id)

    })

  }

  getAProduct(id: any) {
    this.api.getAProductApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res

      },
      error: (err: any) => {
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
      alert('Please login')
    }


  }

  addToCart(product:any){
    console.log(product);
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
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
