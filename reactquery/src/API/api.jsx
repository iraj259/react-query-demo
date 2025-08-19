import axios from 'axios'

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

// fetch the data
export const fetchPosts = async()=>{
const res = await api.get('/posts')
return res.data
}