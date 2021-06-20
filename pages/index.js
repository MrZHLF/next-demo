import {getFeaturedEvents} from '../helpers/api-utils'

import EventList from '../components/events/event-list'



function Home(props) {
  return (
    <div>
        <EventList items={props.events}/>
    </div>
  )
}

export default Home

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()
  console.log(featuredEvents,'featuredEvents');
  return {
    props:{
      events: featuredEvents
    }
  }
}
