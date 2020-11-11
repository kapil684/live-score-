import { Button, Card, CardActions, CardContent, Typography,Grid, DialogTitle, DialogContent, DialogContentText,Dialog,DialogActions } from "@material-ui/core";
import vs from '../img/vs.png';
import React, { Fragment } from "react";
import useState from "react";
import { getMatchDetail } from "../api/Api";
const MyCard =({match})=>{
    const [detail,setDetail]= useState({});
    const [open,setOpen]=useState(false);

    const handleClick=(id)=>{
        getMatchDetail(id)
        .then((data)=>{
            console.log("MATCH DATA",data);
        setDetail(data);
        handleOpen();
    })
        .catch((error)=>console.log(error));
    };
        const getMatchCard=()=>{
            return (
                <Card style={{marginTop:20}}>
                    <CardContent>
                        <Grid container justify="center"  alignItems="center"  spacing={4}>
                            <Grid item>
                                <Typography variant="h5">{match["team-1"]}</Typography>
                            </Grid>
                            <Grid item>
                                <img  style={{ width: 85 }} src={vs}/>
                           </Grid>
                            <Grid item>
                                <Typography variant="h5">{match["team-2"]}</Typography>
                            </Grid >

                        </Grid>
                        </CardContent>
                    
                    <CardActions>
                        <Grid  container justify="center">
                        <Button onClick={()=>{
                            handleClick(match.unique_id);}}
                             item variant="contained" color="primary"> Show details</Button>
                        <Button  style={{marginLeft:5}} item variant="contained" color="primary">
                            Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                            </Button>
                        </Grid>
  
                    </CardActions>
                </Card>
            );
        };

        const handleClose =()=>{
            setOpen(false);

        };

        const handleOpen=()=>{
            setOpen(true);
        };




        const getDialog=()=> (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">"Match Detail.."</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>{detail.stat}</Typography>
                        <Typography>
                            Match
                            <span style={{fontStyle:"italic",fontWeight:"bold"}}>
                                {detail.matchStarted ? "Started" : "Still not started"}{" "}
                            </span>
                        </Typography>
                        <Typography>
              Score
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {" "}
                {detail.score}
              </span>
            </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>

            </Dialog> 
        );
    
    return <Fragment>
        {getMatchCard()}
        {getDialog()}
    </Fragment>
};
 export default MyCard;