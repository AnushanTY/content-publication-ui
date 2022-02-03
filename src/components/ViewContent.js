import {React ,useState, useEffect}from "react";
import {useParams } from "react-router-dom";
import ContentService from "../services/ContentService";


const ViewContent = () => {

    const {contentId} = useParams();
    const [con, setContent] = useState({});
    const [done, setLoad] = useState(false);
    
   
    useEffect(async() => {
      const content = await ContentService.getContent(contentId);
  
      if (content) {
        setLoad(true)
        setContent(content);
      }
    }, [contentId]);
     

        return (
            <div class="container">
              <div>{con.detail}</div>
            </div>
        )
    
};

export default ViewContent;