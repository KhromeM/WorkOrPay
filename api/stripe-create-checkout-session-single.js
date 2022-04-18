const requireAuth = require("./_require-auth.js");
const { getUser, updateUser } = require("./_db.js");
const stripe = require("./_stripe.js");

export default requireAuth(async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body.priceId) {
    return res.status(400).send({
      status: "error",
      message: "No priceId is defined in request body",
    });
  }

  try {
    let { email, stripeCustomerId } = await getUser(user.uid);

    // If user is not a customer then create a customer in Stripe
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email: email });

      await updateUser(user.uid, {
        stripeCustomerId: customer.id,
      });

      stripeCustomerId = customer.id;
    }

    // Create a checkout session
    // for non subscription, single payments
    console.log("in here node");
    const sessionSingle = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],

      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      // Uncomment to allow user to enter a promotional code
      //allow_promotion_codes: true,
      // Uncomment if you need address collection
      //billing_address_collection: "required",
      //shipping_address_collection: { allowed_countries: ['US'] },
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
    });

    // Return success response
<<<<<<< Updated upstream
    res.send({ status: "success", data: session });
=======
    res.send({ status: "success", data: sessionSingle });
>>>>>>> Stashed changes
  } catch (error) {
    console.log("stripe-create-checkout-session-single error", error);

    // Return error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
});
