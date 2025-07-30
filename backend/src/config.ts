export const MONGO_URL = process.env.MONGO_URL || "MONGO_URL"
export const PORT = process.env.PORT || "3001"

export const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "123123"
export const USER_JWT_SECRET = process.env.USER_JWT_SECRET || "321321"
export const MODERATOR_JWT_SECRET = process.env.MODERATOR_JWT_SECRET || "000111"

export const SUPER_ADMIN = process.env.SUPER_ADMIN || "eventnest.official@gmail.com"
export const SUPER_ADMIN_ID = process.env.SUPER_ADMIN_ID || "999" 
export const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY || "999999" 

export const MAIL_HOST = process.env.MAIL_HOST || "gmail"
export const WEBSITE_MAIL = process.env.WEBSITE_MAIL || "eventnest.official@gmail.com"
export const NODEMAILER_APP_PASSWORD = process.env.NODEMAILER_APP_PASSWORD || "000000"