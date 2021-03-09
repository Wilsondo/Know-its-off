import Axios from 'axios';
const axiosBaseURL = Axios.create({
    // 3000 for react-scripts (yarn start-dev)
    // 5000 for /build (yarn start)
    baseURL:'https://cc5c9e47ab49.ngrok.io/api/',
    //baseURL:'http://localhost:3000/api/',
});
export default axiosBaseURL
