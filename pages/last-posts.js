import { useEffect,useState } from 'react'
import useSWR from 'swr'

function LastPostsPage(props) {

    const [posts,setPosts] = useState([props.data])

    // const [isLoading,setIsLoading] = useState(false)

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    //     .then(res => res.json()).then(data=>{
    //         console.log(data,'data');
    //         setPosts(data)
    //         setIsLoading(false)
    //     })
    // },[])

    // if(isLoading) {
    //     return <p>数据加载中...</p>
    // }

    // if(!posts) {
    //     return <p>数据加载失败</p>
    // }

    const {data,error} = useSWR('https://jsonplaceholder.typicode.com/posts?userId=2')

    useEffect(() => {
        if(data){
            setPosts(data)
        }
    },[data])

    if(error) {
        return <p>数据加载失败</p>
    }

    if(!data) {
        return <p>数据加载中...</p>
    }
    return (
        <ul>
            {
                posts.map(post => (
                    <li key={post.id}>ID:  {post.id},  标题:  {post.title}</li>
                ))
            }
        </ul>
    )
}

export default LastPostsPage

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    const data = await response.json()
    return {
        props:{
            data:data
        }
    }
}