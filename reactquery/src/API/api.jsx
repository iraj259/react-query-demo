import axios from 'axios'

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

// fetch the data
export const fetchPosts = async(pageNumber)=>{
try {
    const res = await api.get(`/posts?_start=${pageNumber*5}&_limit=5`)
return res.status===200?res.data:[]
} catch (error) {
    console.log(error)
}
}

export const fetchIndividual=async(id)=>{
    try {
        const res = await api.get(`/posts/${id}`)
        return res.status===200?res.data:[]
    } catch (error) {
            console.log(error)

    }
}