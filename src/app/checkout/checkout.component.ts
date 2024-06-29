import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  IPayPalConfig,  ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent{

  grandTotal:any = ""

  proceedToPaymentStatus:boolean = false 

  status:boolean = false

  public payPalConfig ? : IPayPalConfig;

  constructor(private fb:FormBuilder){}

  checkoutForm = this.fb.group({
    uname:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    flat:["",[Validators.required, Validators.pattern('[a-zA-Z0-9:,.]*')]],
    place:["",[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pin:["",[Validators.required, Validators.pattern('[0-9]*')]]

  })

  cancel(){
    this.checkoutForm.reset()
  }
  
  payment(){
    this.initConfig();
  }

  back(){
    this.proceedToPaymentStatus = false
  }

  proceedToPay(){
    if(this.checkoutForm.valid){
      this.grandTotal = sessionStorage.getItem("total")
      console.log(this.grandTotal);
      
      this.proceedToPaymentStatus = true


    }
    else{
      alert("Please fill the form completely")
    }

  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            /* this.showSuccess = true; */
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            /* this.showCancel = true; */

        },
        onError: err => {
            console.log('OnError', err);
            /* this.showError = true; */
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            /* this.resetStatus(); */
        }
    };
}

}
