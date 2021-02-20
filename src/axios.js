import Axios from 'axios';
const axiosBaseURL = Axios.create({
<<<<<<< HEAD
    //Changed baseurl from 5000 to 3000
    //Hess says that there are issues with the cookies
    //as the urls are not lined up correcty.
    baseURL:'http://flip3.engr.oregonstate.edu:12324/api/',
=======
    // 3000 for react-scripts (yarn start-dev)
    // 5000 for /build (yarn start)
    baseURL:'https://281e5e921351.ngrok.io/api/',
    //baseURL:'http://localhost:5000/api',
>>>>>>> new_frontend
});
export default axiosBaseURL
