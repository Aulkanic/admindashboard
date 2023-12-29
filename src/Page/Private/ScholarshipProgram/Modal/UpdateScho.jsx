import React from 'react'

export const UpdateScho = () => {
  return (
    <Box sx={style}>
    <div style={{margin:5,width:'100%',height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
         <div>
             <Typography sx={{fontSize:22,fontWeight:700,color:'#043F97',fontFamily:'Roboto Serif',lineHeight:'27px'}}>
             Edit Scholarship Program details
             </Typography>
             <Typography sx={{fontSize:14,fontWeight:400,color:'#000000',fontFamily:'Roboto Serif',lineHeight:'16px'}}>
             Fill up the necessary details.
             </Typography>
           </div>
           <div style={{width:'50px',marginRight:'15px',height:'50px',marginTop:'-35px'}}>
           <button style={{height:'100%',backgroundColor:'red',color:'white',padding:'0px',width:'100%',border:'none',borderRadius:'5px'}} onClick={handleClose1}>
             <MdClear style={{fontSize:'30px',fontWeight:'700'}}/>
           </button>
           </div>
    </div>
       <div style={{width:'100%',height:'80%',display:'flex',marginTop:'20px'}}>
       <div style={{width:'40%',height:'100%'}}>
         <div style={{border:'2px solid #dcdcdc',height:'300px',display:'flex',borderRadius:'5px',justifyContent:'center',alignItems:'center'}}>
           {icon1 ? (
             (<img style={{width: '100%',minHeight:'150px',objectFit:'cover',height:'100%'}} className='previmg' src={iconprev1} alt=''/>)
           ) : (
           <img style={{width: '100%',minHeight:'150px',objectFit:'cover',height:'100%'}} className='previmg' src={olddata.icon} alt=""/>
           )}
         </div>
             <Button sx={{padding:'10px 0px 10px 0px',width:'100%'}}>
             <TextField sx={{backgroundColor:'whitesmoke',border:'none',width:'100%'}}
             type='file' accept=".jpg, .jpeg, .png" id="input-with-sx" label="" variant="outlined" fullWidth
             onChange={handleEditFileChange}/>
             </Button>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>Scholarship Logo</Typography>
           </div>
       </div>             
       <Card sx={{width:'55%',marginLeft:'10px',height:'100%'}} elevation={0}>
           <div style={{width:'100%'}}>
           <Box sx={{ display: 'flex'}}>
             <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
             <InputLabel sx={{color:'black',fontWeight:'bold'}}>Scholarship</InputLabel>
             <InputLabel sx={{color:'black',fontWeight:'bold'}}>Name</InputLabel>
             </div> 
             <div style={{width:'100%'}}>
             <TextField fullWidth placeholder={olddata.name} value={titleu || olddata.name} id="input-with-sx" variant="outlined" size="large"
               onChange={(e) => setSchotitle1(e.target.value)}/>
             </div>
           </Box>
           <Box sx={{ display: 'flex'}}>
             <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
             <InputLabel sx={{color:'black',fontWeight:'bold'}}>Start-End</InputLabel>
             <InputLabel sx={{color:'black',fontWeight:'bold'}}>Date</InputLabel>
             </div> 
             <div style={{width:'100%',display:'felx',flexWrap:'wrap',gap:'2px'}}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DateField', 'DateField']}>
               <DateField
                 label="Start Date"
                 sx={{flex:1}}
                 slotProps={{
                   textField: {
                     size: "large",
                     error: false,
                   },
                 }}
                 value={startDate || dayjs(olddata.startDate)}
                 onChange={(newValue) => setStartDate(newValue)}
                 minDate={currentDate}
                 format="YYYY-MM-DD"
               />
               <DateField
                 label="End Date"
                 sx={{flex:1}}
                 slotProps={{
                   textField: {
                     size: "large",
                     error: false,
                   },
                 }}
                 value={endDate || dayjs(olddata.endDate)}
                 onChange={(newValue) => setEndDate(newValue)}
                 minDate={currentDate}
                 format="YYYY-MM-DD"
               />
             </DemoContainer>
           </LocalizationProvider>
             </div>
           </Box>
           <div style={{display: 'flex',margin:'10px 0px 10px 0px'}}>
             <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',marginRight:'5px'}}>
             <InputLabel sx={{color:'black',fontWeight:'bold'}}>Status</InputLabel>
             </div>
             <div style={{border:'2px solid #dcdcdc',width:'100%',paddingLeft:'20px',borderRadius:'5px',height:'58px',paddingTop:'6px'}}>
             <RadioGroup
                 row
                 sx={{width:'100%'}}
                 aria-labelledby="demo-row-radio-buttons-group-label"
                 name="row-radio-buttons-group"
                 defaultValue={olddata.status}
                 value={statusu || olddata.status}
                 onChange={(e) =>{
                 const stat = e.target.value;
                   setStatusCheck1(stat);
                 }}  
               >
           
             <FormControlLabel value="Open" control={<Radio />} label="Open"/>
             <FormControlLabel value="Under Evaluation" control={<Radio />} label="Under Evaluation" sx={{margin:'0px 50px 0px 50px'}}/>
             <FormControlLabel value="Paused" control={<Radio />} label="Paused"/>
             </RadioGroup>
             </div>
           </div>
           <div style={{ display: 'flex'}}>
             <div style={{width:'110px',display:'flex',justifyContent:'center',alignItems:'center',height:'59px',flexDirection:'column',marginRight:'5px'}}>
             <InputLabel sx={{color:'black',fontWeight:'bold'}}>Description</InputLabel>
             </div> 
             <div  style={{width:'100%'}}>
             <TextField multiline
             onChange={(e) => setSchodesc1(e.target.value)}
             placeholder={olddata.description}
             value={descriptionu || olddata.description}
               rows={9} fullWidth id="input-with-sx" variant="outlined" />
             </div>
           </div>
           </div>
       </Card>
       </div>
       <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
           <button style={{marginRight:'10px'}} onClick={handleClose1} className="btnofficials2">Cancel</button>
           <button className="btnofficials1" onClick={Edit}>Save</button>
       </div>
    </Box>
  )
}
