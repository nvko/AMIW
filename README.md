# FloorMart

Simple shop made for college purposes. You can add products to cart, remove and "buy" them. You also can see your purchase history.

## How it works?

FloorMart communicates with our local mysql database using REST Api calls.

## Database and REST API Setup

1. Download XAMPP, start Apache and MySQL.
2. Import .sql database file (located in REST/db) to your local database
3. Copy REST folder to htdocs. 
4. You're ready to go. Just run your Angular project.

## Angular development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## TODO:

1. ~~full setup guide~~ ✅
2.  shopping cart enhancment (modify quantity)
3. login/register users (then remove static user references)
4. product showcase pagination
5. product categories
6. admin panel (adding/removing items, changing price, adding a promotion)

## Screenshots

![Main page](https://github.com/nvko/FloorMart/tree/master/screenshots/main.png)
![Purchase history](https://github.com/nvko/FloorMart/tree/master/screenshots/history.png)
