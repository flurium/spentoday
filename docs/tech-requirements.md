# Technical requirements

[How to make money from Spentoday](./business.md) is another file.

We provide service to easily and fast open store.

Navigation:

- [Auth](#auth)
- [Chat](#chat)
- [Business](#business)
- [Customers](#customers)
- [Multilanguage](#multilanguage)
- [Webhooks](#webhooks)
- [AI (maybe)](#ai)
- [Analytics](#analytics)
- [Technologies](#technologies)
- [Competitors](#competitors)

## Auth

Email and password is main option to login, because people don't want to rely on other
providers.

We need **accept of Terms of Service**. It's going to be checkbox or label "By creating account at our service you accept our Terms of Service".

**Forgot password** options should be also available. Send email with link to reset password.

Check: [dashboard.render.com](https://dashboard.render.com/) for good example.

## Business

- [Isolated page](#isolated-page)
- [Pricing](#pricing)
- [Products](#products)
- [Shop customization](#shop-customization)
- [Approving](#approving)
- [Management](#management)

From business side we want to create shop and earn more money from it than we spend on it (basic stuff). Actually we want to earn more money in comparison with other places to do it (local shop, other platforms) in relation to the spent resources.
Super basically:

spentoday income / time and money > other place income / time and money

So we should make speed of setting up store better, it leads to better ui.

### Isolated page

When business share link to their shop, they often don't want users to be able to buy somewhere else. Which is possible if we show them full platform (our navbar, back to other shops). So we need to create separate pages for internal and external mods of shop.

### Pricing

Trial plan is nessasary to give opportunity to try service. But it should be limited, because we need to gain money. Ideas for current stage:

|          | Hobby | Pro  | Business  | Enterprice   |
| -------- | ----- | ---- | --------- | ------------ |
| Price    | 0 $   | 25 $ | 100 $     | custom       |
| Support  | q&a   | 24/7 | 24/7      | 24/7 primary |
| Shops    | 1     | 3    | unlimited | unlimited    |
| Products | 10    | 500  | unlimited | unlimited    |
| Pages    | 5     | 25   | unlimited | unlimited    |

### Products

Fields:

- name
- description in markdown
- price
- on sale price, null in not on sale
- primary image (shown at search page)
- list of secondary images
- amount of stock, if null or <0 then unlimited

Product description should contain markdown to make good experience with rich editor.

#### Variants

If product has several versions. For example colors, customer should be able to choose one
when he buyes.

According to product images to keep design clean:

- or define same image ratio for all products (4:3 for example)
- or we show them as Pinterest do it: in columns, not in rows

As addition we can add video support, but from youtube, because storing video on our servers is quite expensive.

All new created products should be placed to drafts firstly and saved on typing.
After publishing products they can't be changed, except of price.

I think we should support multicurrency of product price.
And somehow we should add saves, coupons.

### Shop customization

That's where ways between providing isolated shop and central platform go in different ways.
I think it's better to watch at Spentoday as shopping center in real life.
If we look at shopping centers, they have own design,
but each shop inside have different customization.

So Spentoday will provide small set of customization of our main design.
For example: main color of shop, banner of shop.

- favicon
- name
- banner (maybe several, slider)
- logo
- main color (maybe secondary)
- links to social media
- additional inform ation pages
- seo:
  - title
  - description
  - image

#### Contact page

A lot of online shops have contact form. So we should provide one.
We can send emails by ourselves, but it should be payed.
Also make possible to send through telegram.

#### Info pages

Info pages are just markdown. Shop owners add new info page, write bunch of markdown,
we render markdown to html and show.

#### Newsletter?

A lot of shops also have newslatter subscirption section. We can add it, just put email
to table and send notification to shop owner about new newsletter subscriber. It's almost
like subscriptions to the shop. I think we can combine it into 1.

### Approving

Approving shops is essential to keep only good shops inside of the platform.
We want to remove all trash products. But keep approving process fast and super easy.
[Paddle payment service](https://www.paddle.com) has complicated approving process as for me.
So we need simple, not annoying and resonable system.

Propositions:

- approving first 3 products by admins of platform (i propose amount available in trial plan)
- check for bad words in description, name
- reapproving shop if a lot of bad reviews are sent (in comparison to good ones)

### Management

Management of your shops is really feature heavy thing and should be done cool.

As a shop owner you probably will have people who works with you.
So there will be shop members, who can have different set of permissions.
Some of them are editors, owners or just viewers.

## Customers

Customers can subscribe to a shop to recieve notifications and quickly access them.

Make possible to buy stuff without login?

### Profile

Settings:

- email
- password
- full name
- ship addresses (can be several, should propose to save address after order)
- payment methods

Sections:

- my reviews
- my subscriptions (stores I subscribed)
- cart
- orders history
- favorites
- watch history?

## Multilanguage

We should support multilanguage model both for interface and user input (products, shops).
Interface languages:

- english
- ukrainian
- and more if need

Products/shops languages are same as interface languages, but translation is optional.
If provided only 1 translation, then platform will always use it.
If 2 or more translations are provided, then Spentoday will use language of user.
If product doesn't suppor langugae of user, then it will use first possible or default.

## Webhooks

Sometimes you need to add external functionality to the service or connect it with other service.
So we want to add some really basic webhook support. Maybe just one webhook for all sorts of things.

It will be cool at least for experience, but it also can be very useful.
For example you want to send some additional email when user buy some specific product.

## Analytics

Analytics should be anabled for platform itself and for each store. Business wants to see numbers and we also.

## Technologies

- [Backend](#backend)
- [Frontend](#frontend)
- [Infrastructure](#infrastructure)

We decided to seperate our backend and frontend.

### Backend

It's obvious: we will use C#. Just because we know it best in our team.
And it's not so annoying as Java.

Asp.Net Core and Entity Framework Core, that's it. But we will NEVER use Repository.
As a leader I created small extension for Entity Framework which gives us really good DX
and POWER. And we don't need ton of files for repositories.

Database: CockroachDb. It is compatible with PostgreSQL drivers.
CockroachCloud gives good performance and nice free tier.

We will probably need to run background task, like webhooks.

### Frontend

That topic needs tough discussion, because to be modern platform we should use modern technologies. So I consider several options:

- [Next js](https://nextjs.org/)
- [Svelte](https://kit.svelte.dev/)
- [Htmx](https://htmx.org/) + [Alpine js](https://alpinejs.dev/) (actually joking)

Next js is powerful, but React is kind of slow and we actually don't need a lot of new functionality of Next.

Of course we will use [Tailwind css](https://tailwindcss.com/) and can look at [Shadcn UI](https://ui.shadcn.com/)

### Infrastructure

Right now for payments I think to go with [Paypal](https://www.paypal.com/). If somehow we will work on it later, I will try to move to [Hyperswitch](https://hyperswitch.io/).

## Competitors

In this section I will mention some competitors.
I think we can get good features of them and find unique way for us. So Spentoday will be good solution to choose.

- [Squarespace](https://www.squarespace.com/)
- [Shopify](https://www.shopify.com/)
- [BigCommerce](https://www.bigcommerce.com/)
- [PrestaShop](https://prestashop.com/)
- [Rozetka](https://rozetka.com.ua/)
- [Swell](https://www.swell.is/) - very small thing and API oriented

### Squarespace

They are more like website builder, but also provide ecommerce experience. All Squarespace websites exist in isolated environment and a bit limited in filters and search. But they have really good look and product customization.

We can take customization from Squarespace, because it's good, but also add generic properties to add global filters.

### Rozetka

We also do international support (english). But we are strongly Ukraine-oriented. So one of our biggest competitors is Rozetka.

But it's much harder to create store in Rozetka. It uses old technologies. And there is a lot of trash in it nowadays.

So we need control quality of shops, but make creating ones as much easy as possible.

We can also try to coloborate with shipping services and local payments, like monobank for example.
