import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter';

const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.BASE_URL,
    // headers: { "Accept": "application/json", "Content-Type": "application/json", "Access-control-allow-origin": "*" } 
  }),
  options
)

export default client
