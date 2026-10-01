# Vexora

React + TypeScript product catalog built for the React JS assessment. Vexora uses Tailwind CSS, Axios, Lucide React, and React Router DOM.

## Run it

```bash
npm install
npm run dev
```

## Checks

```bash
npm run build
npm run lint
```

## Notes

- Products load from `https://fakestoreapi.com/products` through the Axios client in `src/lib/api.ts`.
- Added products, cart items, quantities, and the selected theme are stored in local storage.
- Use coupon code `SAVE10` for the cart demo.
- TypeScript types provide component prop validation.
