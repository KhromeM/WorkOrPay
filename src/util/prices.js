// Map our custom plan IDs ("basic", "premium", etc) to Stripe price IDs
const stripePriceIds = {
  starter: process.env.REACT_APP_STRIPE_PRICE_STARTER,
  beginner: process.env.REACT_APP_STRIPE_PRICE_BEGINNER,
  business: process.env.REACT_APP_STRIPE_PRICE_BUSINESS,
  contract25: process.env.REACT_APP_STRIPE_PRICE_CONTRACT25,
  contract50: process.env.REACT_APP_STRIPE_PRICE_CONTRACT50,
  contract100: process.env.REACT_APP_STRIPE_PRICE_CONTRACT100,
  contract150: process.env.REACT_APP_STRIPE_PRICE_CONTRACT150,
  contract250: process.env.REACT_APP_STRIPE_PRICE_CONTRACT250,
  contract500: process.env.REACT_APP_STRIPE_PRICE_CONTRACT500,
  contract1000: process.env.REACT_APP_STRIPE_PRICE_CONTRACT1000,
};

// Get Stripe priceId
export function getStripePriceId(planId) {
  return stripePriceIds[planId];
}

// Get friendly plan ID ("basic", "premium", etc) by Stripe plan ID
// Used in auth.js to include planId in the user object
export function getFriendlyPlanId(stripePriceId) {
  return Object.keys(stripePriceIds).find(
    (key) => stripePriceIds[key] === stripePriceId
  );
}
