import {React, useCallback} from "react"
import {useNavigate} from  "react-router-dom"
import {generate} from "randomstring"


const HomePage = () => {
    const navigate = useNavigate()

    const handleNewDoc = useCallback(() => {
        const pageId = generate(5); // "zbc123"
        navigate(`/doc/${pageId}`)
    }, [navigate])

    // useEffect(()=>{
    //     handleNewDoc()
    // }, [handleNewDoc])

    return (
        <div>
            I am on home page
            <button onClick={handleNewDoc}> start editing new document</button>
        </div>
        
    );
}

export default HomePage;