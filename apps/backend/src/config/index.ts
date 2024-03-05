const configs = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  STRIPE_CONFIG: {
    apiKey: process.env.STRIPE_SECRET_KEY,
    webhookConfig: {
      requestBodyProperty: 'rawBody',
      stripeSecrets: {
        account: process.env.STRIPE_WEBHOOK_SECRET,
      },
    },
  },
});
export default configs;
