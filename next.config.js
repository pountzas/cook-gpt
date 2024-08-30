/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SCRAPER_API: process.env.SCRAPER_API,
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
    GOOGLE_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MESSAGE_PROMT: process.env.MESSAGE_PROMT,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ['assets', 'localhost']
  },

}
