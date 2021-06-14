import { Fragment } from 'react'
function UserProfilePage(props) {
    console.log(props,'props');
    return (
        <Fragment>
            <h1>55555</h1>
            <h1>{props.userName}</h1>
        </Fragment>
        
    )
}
export default UserProfilePage

export async function getServerSideProps(context) {
    return {
        props:{
            userName: 'Summer'
        }
    }
}