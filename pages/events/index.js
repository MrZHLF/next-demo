import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { getAllEvents } from './../../dummy-data'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
function AllEventPage() {
  const router  = useRouter()
  const featuredEvent = getAllEvents()

  function findEventsHandler(year,month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

    return (
      <Fragment>
        <EventsSearch onSearch={findEventsHandler}/>
        <EventList items={featuredEvent}/>
      </Fragment>
    )
  }
  
  export default AllEventPage