import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../service/data-share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginUsername:string = ""
  wishlistCount:number = 0 
  cartCnt:number = 0 

  constructor(private api:DataShareService){}


  ngOnInit(): void {
    if(sessionStorage.getItem("username")){
      this.loginUsername = sessionStorage.getItem("username") || ""

      this.api.wishlistCount.subscribe((res:any)=>{
      this.wishlistCount = res 
      })

      this.api.cartCount.subscribe((res:any)=>{
        this.cartCnt = res

      })
      
    }
    else{
      this.loginUsername=""

    }
    
  }  

}
