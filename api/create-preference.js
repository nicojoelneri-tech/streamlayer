import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { items, payer_email } = req.body

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items provided' })
    }

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: 1,
          unit_price: item.price,
          currency_id: 'ARS',
        })),
        payer: payer_email ? { email: payer_email } : undefined,
        back_urls: {
          success: `${process.env.SITE_URL || 'https://streamlayer.vercel.app'}/checkout?status=approved`,
          failure: `${process.env.SITE_URL || 'https://streamlayer.vercel.app'}/checkout?status=failure`,
          pending: `${process.env.SITE_URL || 'https://streamlayer.vercel.app'}/checkout?status=pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'STREAMLAYER',
      },
    })

    return res.status(200).json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    })
  } catch (error) {
    console.error('MP Preference error:', error)
    return res.status(500).json({ error: 'Error creating payment preference' })
  }
}
