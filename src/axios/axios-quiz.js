import axios from 'axios'

export default axios.create({
	baseURL: 'https://react-quiz-6e2d2.firebaseio.com'
})