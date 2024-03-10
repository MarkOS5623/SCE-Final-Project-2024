

export default function MyRequestsList({requests}) {

    // const showRequests = () => {
    //     return(
    //         requests.map((request, index) => {
    //             return <div key={index}>{request.title}</div>
    //         })
    //     )
    // }

    const showRequests = () => {
        return(
            <>
            {
                requests.map((request, index) => {
                    return <div key={index}>{request.title}</div>
                })
            }
            </>
        );
    }


  return (
    <div className="d-flex flex-column">
        {showRequests()}
    </div>
  )
}
