import React from 'react'
import { Card, CardContent,Typography} from "@material-ui/core";
import './InfoBox.css'

function InfoBox({title,cases,isRed,active,total,...props}) {
  return (
    

   <Card onClick={props.onClick}
   className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
   <CardContent>
       {/* Title */}

       <Typography className="info__title" color="textSecondary">
           {title}
       </Typography>


       {/* NoOFCases */}

       <h2 className={`info__noOFCases ${!isRed && "infoBox__cases--green"}`}
       >{cases}</h2>


       {/* TotalCases */}

       <Typography className="infoBox__TotalCases" color="textSecondary">
           {total} Total
       </Typography>



       
   </CardContent>

   </Card>

      
   
  )
}

export default InfoBox;
