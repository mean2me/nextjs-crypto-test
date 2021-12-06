# Test project for Coin360

This is a simple Next.js / React implementation fo the requried task. Please accept my apologise for not implementing a cool layout and the custom period. Due to a very short freetime I couldn't work more than few hours on it, so I focused on what I considered important,
with purpose to show you how I would approach such a kind of project.

## Performances

I didn't care of server side performances, neither SEO, but I'm aware that much could be done :)
On client side, due to the big amount of data to display, I reduced the number of rendered React elements by implementing
an Intersection observer. Also here, I'm aware it could be done better, e.g. I could have manage out of screen elements both horizontally and vertically. I'm sure that you guys know what I mean :)

## How to run

```bash
git clone https://github.com/mean2me/nextjs-crypto-test.git
cd nextjs-crypto-test
npm i
npm run dev
```
