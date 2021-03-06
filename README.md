 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)
![Angular](https://img.shields.io/badge/Angular-9.x-red)
![NPM](https://img.shields.io/badge/NPM-12.16.1-blue)
![Build](https://img.shields.io/badge/Build-Pass-green)

# MONEY TREE
### Implement a template for e-commerces, focus on basic functionalities by using angular, angular material, bootstrap design and firestore.
![header](https://github.com/shanerbo/project-money-tree/blob/master/forest%20peak.PNG)
#### [Demo](https://silver-piggy-client.firebaseapp.com/) built by this template
#### Material Design Framework:
  1. [MDB pro (pricy)](https://mdbootstrap.com/products/angular-ui-kit/)
  2. [Material Design for Bootstrap](https://github.com/FezVrasta/bootstrap-material-design)
  3. [Bootstrap](https://getbootstrap.com/docs/4.4/layout/overview/)
  4. [Nebular](https://akveo.github.io/nebular/docs/components/components-overview)
#### INITILIZE_APP allows website does some process before load the whole page. good for authentication phase
#### CanActive is good for preventing user from certain pages
~~### new UI Framework: https://semantic-ui.com/elements/step.html#step~~
#### Admin page has been deprecated, find repo [here](https://github.com/FloatingPlanet/Admin-Money-Tree)
   #### why user gives up checkout
    61%: Extra costs (shipping, taxes, fees) were too high
    35%: Didn’t want to create an account
    27%: The checkout process was too long or complicated
    24%: Couldn’t see or calculate total order cost up-front
    22%: Reported the website had errors or crashed.
    18% Didn’t trust the online store with their credit card information
    16%: Delivery timeline was much too slow
    10%: Didn’t believe the returns policy to be fair or satisfactory
    8%: Didn’t see their preferred method of payment
    .5%: Their credit card was declined
    
### For multi-vendor website, each seller has its own admin page
#### TODO: 
![diagram](https://github.com/shanerbo/project-money-tree/blob/master/G390i.png)
1. Third party payment service.
    - Paypal
    - Master/Visa
    - WeChat/Alipay
2. Admin page
    - ~~Add coupons~~
    - Add rules for tax, shippings
    - Login page for admin
    - Modify orders
    - Chart/diagram allow user visualize its business
4. Products
    - ~~Responsive products card~~
    - Show products by different categories/constraints
    - Redesign user scheme, if admin change products details, products in user cart will not updated!!!!!!!!!

5. Cart
    - Show numbers if user add same products multiple times
    - ~~Guest cart~~
    - ~~Registered user has its own cart~~
        ~~- If user update its cart without logging, its shopping cart shoule be updated once user login.~~
21. Checkout
    - ~~14. Diasble form submit button!!!!!!!! in everywhere(check out page)~~
    - ~~15. In checkout page, set radio button to preset value~~
    - ~~16. Checkout page need to be fix, checkout flow is in urgent!!!~~
    - Not logged in 
      - link button to loggin page
      - must login before checkout
    - logged in but empty address
      - debug
    - logged in with address
      - implement edit/delete in saFormGroup
      - debug
      - address Auto Complete (pending)
6. Move to Amplify (not for now)
7. In modify product page, we accomplished progress bar badly, need to find a elegant way to implement it!
8. User info page (WIP)
9. ~~Logged in user are allowed to browse their orders~~
10. Add image while user adding new product
11. index page (WIP)
12. product can only be assigned to one primary/secondary category (admin) (WIP)
13. ~~Fix bug in category form caused by primary SKU ~~
17. ElasticSearch[Kibana](https://demo.elastic.co/app/kibana#/home?_g=())
18. Search and Category bar shoube be removed in small screen size
19. Move domain to floatingplanet.app, use floatingplanet.app to register gcp.
20. Currently, we use firestore function to remove item whose count is less than 1 in user's cart, but the problem is that the response time is too long (500ms), need to come up a better approach later on.
21. #### Refactor all form and button to Nebular
22. can we store nebular or other framework locally just in case dependencies decrepted 
99. Remove all warnings and errors
##### HTML/CSS/Date hook up: [Jiaran Yu](https://github.com/jiaranyu)
##### Cook: [Erbo Shan](https://github.com/shanerbo)
 
