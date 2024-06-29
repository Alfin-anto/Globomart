import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  serverUrl = 'http://localhost:3000'

  //behaviour subject
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem("token")){//to get wishlist count after login
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  //api to get all product 
  getAllProduct = () => {
    return this.http.get(`${this.serverUrl}/all-product`)
  }

  //api to register a user 
  registerApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/user/register`, reqBody)
  }

  //api to login a user
  loginApi(reqbody:any){
    return this.http.post(`${this.serverUrl}/user/login`,reqbody)
  }

  addTokenToHeader(){
    //object for the httpHeaders()
    let headers = new HttpHeaders()
    //session token fetch 
    const token = sessionStorage.getItem("token")
    if(token){
      //append() - used to add data to the object
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers} //return an object with key has headers and value has headers

  }


  //api to add product to wishlist

  addToWishlistApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-wishlist`, reqBody, this.addTokenToHeader())
  }

  //api to get a product 
  getAProductApi(id:any){
    return this.http.get(`${this.serverUrl}/get-product/${id}`)

  }

  //api to get all user wishlist product 
  getWishlistProductApi(){
    return this.http.get(`${this.serverUrl}/wishlist/all-product`,this.addTokenToHeader())
  }

  //api to delete an item from wishlist 
  deleteWishlistItemApi(id:any){
    return this.http.delete(`${this.serverUrl}/remove-wishlistItem/${id}`,this.addTokenToHeader())
  }

  //get wishlist count 

  getWishlistCount(){
    this.getWishlistProductApi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)      
    })
  }  

  //api to add data to cart

  addToCartApi(product:any){
    return this.http.post(`${this.serverUrl}/add-cart`, product, this.addTokenToHeader())
  }

  //api to get all cart items 

  getCartItemApi(){
    return this.http.get(`${this.serverUrl}/cart/all-products`, this.addTokenToHeader())
  }

  //api to remove item

  removeCartItemApi(id:any){
    return this.http.delete(`${this.serverUrl}/cart/remove-item/${id}`, this.addTokenToHeader())
  }

  //api to empty cart 
  emptyCartApi(){
    return this.http.delete(`${this.serverUrl}/empty-cart`, this.addTokenToHeader())
  } 

  getCartCount(){
    this.getCartItemApi().subscribe((res:any)=>{
      this.cartCount.next(res.length)

    })
  }

  //api to increment product
  incrementCartItem(id:any){
    return this.http.get(`${this.serverUrl}/cart/increment/${id}`, this.addTokenToHeader())
  }

  //api to decrement product
  decrementCartItem(id:any){
    return this.http.get(`${this.serverUrl}/cart/decrement/${id}`, this.addTokenToHeader())
  }


}
