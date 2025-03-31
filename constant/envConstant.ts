import EVN from '@/env.json'
const env = {
    API_URL: EVN.API_URL || "https://giving-grackle-gradually.ngrok-free.app",
    LANGUAGE: EVN.LANGUAGE,
    SHOP_ID: EVN.SHOP_ID,
    ACCESS_TOKEN: EVN.ACCESS_TOKEN
}

export default env