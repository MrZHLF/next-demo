import { useRouter } from 'next/router'
import { Fragment,useState,useEffect } from 'react'

import useSWR from 'swr'

import {getFilteredEvents} from '../../helpers/api-utils'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

function FilteredEventPage(props) {
  const [list,setList] = useState()
  const router  = useRouter()

  const filterData = router.query.slug


  const {data,error} =  useSWR('https://nextjs-course-36511-default-rtdb.firebaseio.com/events.json')
  useEffect(()=> {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      setList(events)
    }
  },[data])

  
  if(!list) {
    return <p className="center">页面加载中...</p>
  }

  // 处理捕获的路由参数
  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]
  const numYear = +filteredYear
  const numMonth = +filteredMonth

   // 判断是否为有效年份
   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2022 || numYear < 2021 || numMonth > 12 || numMonth < 1) {
    return (
      <Fragment>
        <ErrorAlert>
        <p>无效查询，请重新选择过滤时间</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">查看所有活动</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = list.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    )
  })

 

  // const filteredEvents = props.filteredEvents

  if(!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>抱歉，查找不到改日期的活动内容!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">查看所有活动</Button>
        </div>
      </Fragment>
    )
  }

  // 日期格式化
  const date = new Date(numYear,numMonth - 1)
    return ( 
      <div>
        <ResultsTitle date={date}/>
        <EventList items={filteredEvents}/>
      </div>
    )
  }
  
  export default FilteredEventPage


  // export async function getServerSideProps(context) {
  //   const {params} = context
  //   const filterData = params.slug

  //   // 处理捕获的路由参数
  //   const filteredYear = filterData[0]
  //   const filteredMonth = filterData[1]

  //   const numYear = +filteredYear
  //   const numMonth = +filteredMonth

  //   // 判断是否为有效年份
  //   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2022 || numYear < 2021 || numMonth > 12 || numMonth < 1) {
  //     return {
  //       props:{
  //         hasError: true
  //       }
  //     }
  //   }

  //   const filteredEvents = await getFilteredEvents({
  //     year: numYear,
  //     month: numMonth
  //   })

  //   return {
  //     props: {
  //       filteredEvents: filteredEvents,
  //       date: {
  //         year: numYear,
  //         month: numMonth
  //       }
  //     }
  //   }

  // }