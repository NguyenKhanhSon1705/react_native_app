import EVN from '@/env.json'
const env = {
    API_URL: EVN.API_URL || "http://192.168.1.11:5000",
    LANGUAGE: EVN.LANGUAGE,
    SHOP_ID: EVN.SHOP_ID,
    ACCESS_TOKEN: EVN.ACCESS_TOKEN
}

export default env