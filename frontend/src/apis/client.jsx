import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter';

const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3001'
  }),
  options
);

export default client;
