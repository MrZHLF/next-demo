import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
function Home(props) {
  const { products } = props

  return (
    <ul>
      {
        products.map(product=> (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))
      }
    </ul>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(),'data','dummy-data.json');
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  if(!data) {
    return {
      redirect: { //重定向
        destination: '/np-data'
      }
    }
  }
  if (data.products.length === 0) {
    // 自动打开 404 页面
    return {
      notFound: true
    }
  }
  return {
    props:{
      products:data.products
    }
  }
}

export default Home