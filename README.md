# Sree Kanti Website

Static GitHub Pages website for Sree Kanti natural skincare and bath care products.

The site includes an Amazon-style storefront, Marathi/English language switching, search, category filters, sorting, product cards, introductory pricing, ratings, wishlist, quick view, recently viewed products, cart, Buy Now buttons, local user login, delivery address saving, coupon note, delivery PIN note, WhatsApp checkout, Instagram link, and offer popup.

Note: Login and address are saved in the visitor's browser using local storage. For real accounts, online payments, and order history across devices, connect a backend or e-commerce platform later.

## Files

- `index.html` - Website content
- `styles.css` - Responsive styling
- `script.js` - Mobile menu, language switch, cart, Buy Now, and WhatsApp checkout behavior
- `assets/products/` - Product images optimized for web
- `assets/offers/` - Offer banner image
- `assets/logo.png` - Brand logo

## Publish On GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this directory.
3. Go to repository **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/root`.
7. Save.
8. GitHub will provide the website URL after deployment.

Contact details used on the site:

- Email: `kantiubtan@gmail.com`
- Phone/WhatsApp: `8208427976`
- Instagram: `@kantiubtan`
# Backend requirement for cross-device login

If you need **same user login across different computers/browsers**, run this project with the included backend server:

```bash
node server.js
```

Then open the site from that server URL (not from a local `file://` open or static-only host without `/api/*` support).

Without backend API reachability, registration is only saved on the current device/browser storage.
