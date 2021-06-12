import { getAllEvents } from './../../dummy-data'
import EventList from '../../components/events/event-list'
function AllEventPage() {
  const featuredEvent = getAllEvents()
    return (
      <div>
        <EventList items={featuredEvent}/>
      </div>
    )
  }
  
  export default AllEventPage