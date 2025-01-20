
import { fetcher } from "../config/fetchter";
import { BASE_URL } from "../constants";
import { SubscriptionPlan } from "../definitions"
export const subscribePremium = async (subscriptionPlans: SubscriptionPlan) => {
  const paymentResponse = await fetcher(`/payment/create_payment/${subscriptionPlans}`)
  window.open(paymentResponse.data)?.focus()
  // try {
  //   const token = localStorage.getItem('token');
  //   const response = await fetch(`${BASE_URL}/payment/create_payment/${subscriptionPlans}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `${token}`
  //     },
  //   })
  //   const data = await fetcher(`${BASE_URL}/payment/create_payment/${subscriptionPlans}`)

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok: ' + response.statusText);
  //   }


  // } catch (error) {
  //   console.error(error);
  // }
}