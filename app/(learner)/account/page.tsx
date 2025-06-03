'use client';

import CheckoutForm from './checkout-form';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CheckoutForm />
    </div>
  );
}
