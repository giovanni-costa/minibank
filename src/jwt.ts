// JWT - Jason Web Token
const crypt = require('crypto')
const b64 = require('base64-url')

const header: {alg: string, typ:string} = {
    alg: 'HS256',
    typ: 'JWT'
}

const payload: {} = {
    user: 'Giovanni96',
    name: 'Giovanni',
    exp: new Date().getTime()
}

const key:string = 'x2d6j6'

const headerEncoded = b64.encode(JSON.stringify(header))
const payloadEncoded = b64.encode(JSON.stringify(payload))

const signature = crypt
    .createHmac('sha256', key)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('bin')

console.log(`${headerEncoded}.${payloadEncoded}.${b64.encode(signature)}`)
