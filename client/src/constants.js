// Globals
export const ENV = process.env || {}

export const DEV = ENV.NODE_ENV === 'development'
export const STAGING = ENV.NODE_ENV === 'staging'
export const PROD = ENV.NODE_ENV === 'production'

// Async States
export const FULFILLED = 'FULFILLED'
export const PENDING = 'PENDING'
export const REJECTED = 'REJECTED'

// HTTP Methods
export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const PATCH = 'PACTH'
export const DELETE = 'DELETE'

// Style
export const BLUE = 'rgba(47,47,204,1)'
export const LIGHT_BLUE = 'rgba(0,144,255,1)'
export const DARK_BLUE = 'rgba(0,11,51,1)'
export const BOX_SHADOW = '0px 3px 6px 0px rgba(0,0,0,.1)'
export const GREY = '#444444'
export const DARK_GREY = '#141414'

export const CARD_TITLE_PRIMARY = { fontSize: 32, fontWeight: 200 }
export const CARD_TITLE_SECONDARY = { fontSize: 14 }
