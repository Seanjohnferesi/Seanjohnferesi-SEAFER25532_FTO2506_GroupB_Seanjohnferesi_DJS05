import {useParams} from "react-router-dom"

export default function ShowDetail() {
    const {id} = useParams

    return (
        <div>
            <h1>Show Details Page</h1>
            <p>Podcast ID: {id}</p>
        </div>
    )
}