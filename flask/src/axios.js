import Axios from 'axios';
const axiosBaseURL = Axios.create({
    // 3000 for react-scripts (yarn start-dev)
    // 5000 for /build (yarn start)
    //baseURL:'https://624c7fc5b9d1.ngrok.io/api/',
    baseURL:'https://know-its-off.com/api/',
});
export default axiosBaseURL
