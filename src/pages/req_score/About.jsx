import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './about.scss';
import './req_score.css';
import { FetchingSchoProg } from '../../api/request';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from "react";
import { admininfo } from "../../App";
import FormControl from '@mui/material/FormControl';
import { CreatingScore,FetchingScore,ListAccess } from '../../api/request';
import swal from 'sweetalert';
import { Card } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

const theme = createTheme();
const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

export const About = () => {
  const { loginUser,user } = useContext(admininfo);
    const [schoprog, setSchoProg] = useState([]);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const[scho,setScho] = useState('');
    const[schoname,setSchoname] = useState('');
    const [access,setAccess] = useState([])
    const[swl,setWl] = useState('');
    const[swl1,setWl1] = useState('');
    const[swl2,setWl2] = useState('');
    const[swl3,setWl3] = useState('');
    const[shl,setHl] = useState('');
    const[shl1,setHl1] = useState('');
    const[shl2,setHl2] = useState('');
    const[shl3,setHl3] = useState('');
    const[shl4,setHl4] = useState('');
    const[sos,setOs] = useState('');
    const[sos1,setOs1] = useState('');
    const[sos2,setOs2] = useState('');
    const[sos3,setOs3] = useState('');
    const[sos4,setOs4] = useState('');
    const[smi,setMi] = useState('');
    const[smi1,setMi1] = useState('');
    const[smi2,setMi2] = useState('');
    const[smi3,setMi3] = useState('');
    const[smi4,setMi4] = useState('');
    const[smi5,setMi5] = useState('');
    const[sfn,setFn] = useState('');
    const[sfn1,setFn1] = useState('');
    const[sfn2,setFn2] = useState('');
    const[sfn3,setFn3] = useState('');
    const[sfn4,setFn4] = useState('');
    const[sfa,setFa] = useState('');
    const[sfa1,setFa1] = useState('');
    const[sfa2,setFa2] = useState('');
    const[sfa3,setFa3] = useState('');
    const[sfa4,setFa4] = useState('');
    const[sfa5,setFa5] = useState('');
    const[sfa6,setFa6] = useState('');
    const[sts1,setTs1] = useState('');
    const[sts2,setTs2] = useState('');
    const[sts3,setTs3] = useState('');
    const[sts4,setTs4] = useState('');
    const[sts5,setTs5] = useState('');
    const[sts6,setTs6] = useState('');
    const[sts,setTs] = useState('');
    const[sgwa,setGwa] = useState('');
    const[sgwa1,setGwa1] = useState('');
    const[sgwa2,setGwa2] = useState('');
    const[sgwa3,setGwa3] = useState('');
    const[sgwa4,setGwa4] = useState('');
    const[sgwa5,setGwa5] = useState('');
    const [errors, setErrors] = useState({}); 
    const [scorelist, setScorelist] = useState([])
    const [accessList,setAccesslist] = useState([])

    const handleChange = async (event) => {
      const value = await event.target.value;
      setSchoname(value);
      const schoname = value;
      setShowBackdrop(true);
     FetchingScore.FETCH_SCORECARD(schoname)
        .then(response => {
  
          const scorelist = response.data.ScholarScore;
          setScorelist(scorelist)
          setShowBackdrop(false);
        })
        .catch(error => {
          console.error(error);
        });
    };
    useEffect(() => {

      async function Fetch(){
        setShowBackdrop(true);
        const response = await FetchingSchoProg.FETCH_SCHOPROG()
        const res = await ListAccess.ACCESS()
        let acc = await ListAccess.ACCESS()
        const empacc = acc.data.result?.filter(data => data.employeeName === user.name)
        setAccess(empacc)
        setAccesslist(res.data.result[0])
        setSchoProg(response.data.SchoCat);
        setShowBackdrop(false);
      }
      Fetch();
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      const isValueIncluded = access[0]?.sectionId.includes('Score Card');
      if(!isValueIncluded){
        swal({
          text: 'UnAuthorized Access',
          timer: 2000,
          buttons: false,
          icon: "error",
        })
        return
      }  
      if(scorelist && scorelist.length > 0){
        const errors = {};
      const wl = swl || scorelist[0].wlsc;
      const wl1 = swl1 || scorelist[0].wlsc1;
      const wl2 = swl2 || scorelist[0].wlsc2;
      const wl3 = swl3 || scorelist[0].wlsc3;
      const hl = shl || scorelist[0].hlsc;
      const hl1 = shl1 || scorelist[0].hlsc1;
      const hl2 = shl2 || scorelist[0].hlsc2;
      const hl3 = shl3 || scorelist[0].hlsc3;
      const hl4 = shl4 || scorelist[0].hlsc4;
      const os = sos || scorelist[0].ossc;
      const os1 = sos1 || scorelist[0].ossc1;
      const os2 = sos2 || scorelist[0].ossc2;
      const os3 = sos3 || scorelist[0].ossc3;
      const os4 = sos4 || scorelist[0].ossc4;
      const mi = smi || scorelist[0].misc;
      const mi1 = smi1 || scorelist[0].misc1;
      const mi2 = smi2 || scorelist[0].misc2;
      const mi3 = smi3 || scorelist[0].misc3;
      const mi4 = smi4 || scorelist[0].misc4;
      const mi5 = smi5 || scorelist[0].misc5;
      const fa = sfa || scorelist[0].fasc;
      const fa1 = sfa1 || scorelist[0].fasc1;
      const fa2 = sfa2 || scorelist[0].fasc2;
      const fa3 = sfa3 || scorelist[0].fasc3;
      const fa4 = sfa4 || scorelist[0].fasc4;
      const fa5 = sfa5 || scorelist[0].fasc5;
      const fa6 = sfa6 || scorelist[0].fasc6;
      const ts = sts || scorelist[0].tssc;
      const ts1 = sts1 || scorelist[0].tssc1;
      const ts2 = sts2 || scorelist[0].tssc2;
      const ts3 = sts3 || scorelist[0].tssc3;
      const ts4 = sts4 || scorelist[0].tssc4;
      const ts5 = sts5 || scorelist[0].tssc5;
      const ts6 = sts6 || scorelist[0].tssc6;
      const gwa = sgwa || scorelist[0].gwasc;
      const gwa1= sgwa1 || scorelist[0].gwasc1;
      const gwa2 = sgwa2 || scorelist[0].gwasc2;
      const gwa3 = sgwa3 || scorelist[0].gwasc3;
      const gwa4 = sgwa4 || scorelist[0].gwasc4;
      const gwa5 = sgwa5 || scorelist[0].gwasc5;
      const fn = sfn || scorelist[0].fnsc;
      const fn1 = sfn1 || scorelist[0].fnsc1;
      const fn2 = sfn2 || scorelist[0].fnsc2;
      const fn3 = sfn3 || scorelist[0].fnsc3;
      const fn4 = sfn4 || scorelist[0].fnsc4;
      if(schoname === ''){
        errors.schoname = 'This Field is required';
      }
      if(wl === '' || wl1 === '' || wl2 === '' || wl3 === ''){
        errors.wl = 'Q1 is required';
      }
      if(wl1 > 100 || wl2 > 100 || wl3 > 100){
        errors.wl1 = 'Rate must not greater than 100 Percent';
      }
      if(wl1 < 0 || wl2 < 0 || wl3 < 0){
        errors.wl2 = 'Rate must not less than 0 Percent';
      }
      if(hl === '' || hl1 === '' || hl2 === '' || hl3 === '' || hl4 === ''){
        errors.hl = 'Q2 is required';
      }
      if(hl1 > 100 || hl2 > 100 || hl3 > 100 || hl4 > 100){
        errors.hl1 = 'Rate must not greater than 100 Percent';
      }
      if(hl1 < 0 || hl2 < 0 || hl3 < 0 || hl4 < 0){
        errors.hl2 = 'Rate must not less than 0 Percent';
      }
      if(os === '' || os1 === '' || os2 === '' || os3 === '' || os4 === ''){
        errors.os = 'Q3 is required';
      }
      if(os1 > 100 || os2 > 100 || os3 > 100 || os4 > 100){
        errors.os1 = 'Rate must not greater than 100 Percent';
      }
      if(os1 < 0 || os2 < 0 || os3 < 0 || os4 < 0){
        errors.os2 = 'Rate must not less than 0 Percent';
      }
      if(mi === '' || mi1 === '' || mi2 === '' || mi3 === '' || mi4 === '' || mi5 === ''){
        errors.mi = 'Q4 is required';
      }
      if(mi1 > 100 || mi2 > 100 || mi3 > 100 || mi4 > 100 || mi5 > 100){
        errors.mi1 = 'Rate must not greater than 100 Percent';
      }
      if(mi1 < 0 || mi2 < 0 || mi3 < 0 || mi4 < 0 || mi5 < 0){
        errors.mi2 = 'Rate must not less than 0 Percent';
      }
      if(fa === '' || fa1 === '' || fa2 === '' || fa3 === '' || fa4 === '' || fa5 === '' || fa6 === ''){
        errors.fa = 'Q6 is required';
      }
      if(fa1 > 100 || fa2 > 100 || fa3 > 100 || fa4 > 100 || fa5 > 100 || fa6 > 100){
        errors.fa1 = 'Rate must not greater than 100 Percent';
      }
      if(fa1 < 0 || fa2 < 0 || fa3 < 0 || fa4 < 0 || fa5 < 0 || fa6 < 0){
        errors.fa2 = 'Rate must not less than 0 Percent';
      }
      if(ts === '' || ts1 === '' || ts2 === '' || ts3 === '' || ts4 === '' || ts5 === '' || ts6 === ''){
        errors.ts = 'Q7 is required';
      }
      if(ts1 > 100 || ts2 > 100 || ts3 > 100 || ts4 > 100 || ts5 > 100 || ts6 > 100){
        errors.ts1 = 'Rate must not greater than 100 Percent';
      }
      if(ts1 < 0 || ts2 < 0 || ts3 < 0 || ts4 < 0 || ts5 < 0 || ts6 < 0){
        errors.ts2 = 'Rate must not less than 0 Percent';
      }
      if(gwa === '' || gwa1 === '' || gwa2 === '' || gwa3 === '' || gwa4 === '' || gwa5 === ''){
        errors.gwa = 'Q8 is required';
      }
      if(gwa1 > 100 || gwa2 > 100 || gwa3 > 100 || gwa4 > 100 || gwa5 > 100){
        errors.gwa1 = 'Rate must not greater than 100 Percent';
      }
      if(gwa1 < 0 || gwa2 < 0 || gwa3 < 0 || gwa4 < 0 || gwa5 < 0){
        errors.gwa2 = 'Rate must not less than 0 Percent';
      }
      if(fn === '' || fn1 === '' || fn2 === '' || fn3 === '' || fn4 === ''){
        errors.fn = 'Q5 is required';
      }
      if(fn1 > 100 || fn2 > 100 || fn3 > 100 || fn4 > 100){
        errors.fn1 = 'Rate must not greater than 100 Percent';
      }
      if(fn1 < 0 || fn2 < 0 || fn3 < 0 || fn4 < 0){
        errors.fn2 = 'Rate must not less than 0 Percent';
      }
      const totalsc = parseFloat(wl) + parseFloat(hl) + parseFloat(os) + parseFloat(mi) + parseFloat(fa)
                      + parseFloat(ts) + parseFloat(gwa) + parseFloat(fn);
      if(totalsc !== 100){
        errors.total = 'Total Rate must be 100 Percent';
      }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      let errorMessages = '';
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessages += errors[key] + '\n';
        }
      }
      
      swal({
        title: "ERRORS",
        text: errorMessages,
        icon: "error",
        button: "OK",
      });
      console.log(errors)
      return;
    }
    CreatingScore.CREATE_SCORECARD({schoname,wl,wl1,wl2,wl3,hl,hl1,hl2,hl3,hl4,os,os1,os2,os3,os4,
      mi,mi1,mi2,mi3,mi4,mi5,fa,fa1,fa2,fa3,fa4,fa5,fa6,ts,ts1,ts2,ts3,ts4,
      ts5,ts6,gwa,gwa1,gwa2,gwa3,gwa4,gwa5,fn,fn1,fn2,fn3,fn4})
      .then(res => {
        console.log(res)
        swal('Save')
      }
       )
      .catch(err => console.log(err));
      }else{
        const errors = {};
        const wl = swl
        const wl1 = swl1
        const wl2 = swl2
        const wl3 = swl3
        const hl = shl
        const hl1 = shl1
        const hl2 = shl2
        const hl3 = shl3
        const hl4 = shl4
        const os = sos
        const os1 = sos1
        const os2 = sos2
        const os3 = sos3
        const os4 = sos4
        const mi = smi
        const mi1 = smi1
        const mi2 = smi2
        const mi3 = smi3
        const mi4 = smi4
        const mi5 = smi5
        const fa = sfa
        const fa1 = sfa1
        const fa2 = sfa2
        const fa3 = sfa3
        const fa4 = sfa4
        const fa5 = sfa5
        const fa6 = sfa6
        const ts = sts
        const ts1 = sts1
        const ts2 = sts2
        const ts3 = sts3
        const ts4 = sts4
        const ts5 = sts5
        const ts6 = sts6
        const gwa = sgwa
        const gwa1= sgwa1
        const gwa2 = sgwa2
        const gwa3 = sgwa3
        const gwa4 = sgwa4
        const gwa5 = sgwa5
        const fn = sfn
        const fn1 = sfn1
        const fn2 = sfn2
        const fn3 = sfn3
        const fn4 = sfn4
        if(schoname === ''){
          errors.schoname = 'SCHOLARSHIP PROGRAM Selection is required';
        }
        if(wl === '' || wl1 === '' || wl2 === '' || wl3 === ''){
          errors.wl = 'Q1 is required';
        }
        if(wl1 > 100 || wl2 > 100 || wl3 > 100){
          errors.wl1 = 'Q1 Rate must not greater than 100 Percent';
        }
        if(wl1 < 0 || wl2 < 0 || wl3 < 0){
          errors.wl2 = 'Q1 Rate must not less than 0 Percent';
        }
        if(hl === '' || hl1 === '' || hl2 === '' || hl3 === '' || hl4 === ''){
          errors.hl = 'Q2 is required';
        }
        if(hl1 > 100 || hl2 > 100 || hl3 > 100 || hl4 > 100){
          errors.hl1 = 'Q2 Rate must not greater than 100 Percent';
        }
        if(hl1 < 0 || hl2 < 0 || hl3 < 0 || hl4 < 0){
          errors.hl2 = 'Q2 Rate must not less than 0 Percent';
        }
        if(os === '' || os1 === '' || os2 === '' || os3 === '' || os4 === ''){
          errors.os = 'Q3 is required';
        }
        if(os1 > 100 || os2 > 100 || os3 > 100 || os4 > 100){
          errors.os1 = 'Q3 Rate must not greater than 100 Percent';
        }
        if(os1 < 0 || os2 < 0 || os3 < 0 || os4 < 0){
          errors.os2 = 'Q3 Rate must not less than 0 Percent';
        }
        if(mi === '' || mi1 === '' || mi2 === '' || mi3 === '' || mi4 === '' || mi5 === ''){
          errors.mi = 'Q4 is required';
        }
        if(mi1 > 100 || mi2 > 100 || mi3 > 100 || mi4 > 100 || mi5 > 100){
          errors.mi1 = 'Q4 Rate must not greater than 100 Percent';
        }
        if(mi1 < 0 || mi2 < 0 || mi3 < 0 || mi4 < 0 || mi5 < 0){
          errors.mi2 = 'Q4 Rate must not less than 0 Percent';
        }
        if(fa === '' || fa1 === '' || fa2 === '' || fa3 === '' || fa4 === '' || fa5 === '' || fa6 === ''){
          errors.fa = 'Q6 is required';
        }
        if(fa1 > 100 || fa2 > 100 || fa3 > 100 || fa4 > 100 || fa5 > 100 || fa6 > 100){
          errors.fa1 = 'Q6 Rate must not greater than 100 Percent';
        }
        if(fa1 < 0 || fa2 < 0 || fa3 < 0 || fa4 < 0 || fa5 < 0 || fa6 < 0){
          errors.fa2 = 'Q6 Rate must not less than 0 Percent';
        }
        if(ts === '' || ts1 === '' || ts2 === '' || ts3 === '' || ts4 === '' || ts5 === '' || ts6 === ''){
          errors.ts = 'Q7 is required';
        }
        console.log(ts1,ts2,ts3,ts4,ts5,ts6)
        if(ts1 > 100 || ts2 > 100 || ts3 > 100 || ts4 > 100 || ts5 > 100 || ts6 > 100){
          errors.ts1 = 'Q7 Rate must not greater than 100 Percent';
        }
        if(ts1 < 0 || ts2 < 0 || ts3 < 0 || ts4 < 0 || ts5 < 0 || ts6 < 0){
          errors.ts2 = 'Q7 Rate must not less than 0 Percent';
        }
        if(gwa === '' || gwa1 === '' || gwa2 === '' || gwa3 === '' || gwa4 === '' || gwa5 === ''){
          errors.gwa = 'Q8 is required';
        }
        if(gwa1 > 100 || gwa2 > 100 || gwa3 > 100 || gwa4 > 100 || gwa5 > 100){
          errors.gwa1 = 'Q8 Rate must not greater than 100 Percent';
        }
        if(gwa1 < 0 || gwa2 < 0 || gwa3 < 0 || gwa4 < 0 || gwa5 < 0){
          errors.gwa2 = 'Q8 Rate must not less than 0 Percent';
        }
        if(fn === '' || fn1 === '' || fn2 === '' || fn3 === '' || fn4 === ''){
          errors.fn = 'Q5 is required';
        }
        if(fn1 > 100 || fn2 > 100 || fn3 > 100 || fn4 > 100){
          errors.fn1 = 'Q5 Rate must not greater than 100 Percent';
        }
        if(fn1 < 0 || fn2 < 0 || fn3 < 0 || fn4 < 0){
          errors.fn2 = 'Q5 Rate must not less than 0 Percent';
        }
        const totalsc = parseFloat(wl) + parseFloat(hl) + parseFloat(os) + parseFloat(mi) + parseFloat(fa)
                        + parseFloat(ts) + parseFloat(gwa) + parseFloat(fn);
        if(totalsc !== 100){
          errors.total = 'Total Rate must be 100 Percent';
        }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      let errorMessages = '';
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessages += errors[key] + '\n';
        }
      }
      
      swal({
        title: "ERRORS",
        text: errorMessages,
        icon: "error",
        button: "OK",
      });
      return;
    }
    setShowBackdrop(true);
    CreatingScore.CREATE_SCORECARD({schoname,wl,wl1,wl2,wl3,hl,hl1,hl2,hl3,hl4,os,os1,os2,os3,os4,
      mi,mi1,mi2,mi3,mi4,mi5,fa,fa1,fa2,fa3,fa4,fa5,fa6,ts,ts1,ts2,ts3,ts4,
      ts5,ts6,gwa,gwa1,gwa2,gwa3,gwa4,gwa5,fn,fn1,fn2,fn3,fn4})
      .then(res => {
        setShowBackdrop(false);
        swal({
          title: "Success",
          text: "Saved!",
          icon: "success",
          button: "OK",
        });
      }
       )
      .catch(err => console.log(err));
      }
    }
    const scoreCardlist = scorelist?.map((data,index) =>{

      return(
        <>
          <div key={index}>
            <div className="quescontainer">
            <div className="quesco">
            <div className="hshe">
            <input  placeholder={data.wlsc} onChange={(e) =>setWl(e.target.value)} type="number"/><p>Q1:Saan ka nakatira</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.wlsc1} onChange={(e) =>setWl1(e.target.value)} type="number"/><p>CHOICE1:Subdivision</p>
            </div>
            <div className="hshe">
            <input placeholder={data.wlsc2} onChange={(e) =>setWl2(e.target.value)} type="number"/><p>CHOICE2:Sitio/Purok</p>
            </div>
            <div className="hshe">
            <input placeholder={data.wlsc3} onChange={(e) =>setWl3(e.target.value)} type="number"/><p>CHOICE3:Depressed Area</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.hlsc} onChange={(e) =>setHl(e.target.value)} type="number"/><p>Q2:Gaano na Katagal?</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.hlsc1} onChange={(e) =>setHl1(e.target.value)} type="number"/><p>CHOICE1:6 Months</p>
            </div>
            <div className="hshe">
            <input placeholder={data.hlsc2} onChange={(e) =>setHl2(e.target.value)} type="number"/><p>CHOICE2:1-2 Years</p>
            </div>
            <div className="hshe">
            <input placeholder={data.hlsc3} onChange={(e) =>setHl3(e.target.value)} type="number"/><p>CHOICE3:3-4 Years</p>
            </div>
            <div className="hshe">
            <input placeholder={data.hlsc4} onChange={(e) =>setHl4(e.target.value)} type="number"/><p>CHOICE4:5 Years</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.ossc} onChange={(e) =>setOs(e.target.value)} type="number"/><p>Q3:Uri ng Pag-aari ng Bahay?</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.ossc1} onChange={(e) =>setOs1(e.target.value)} type="number"/><p>CHOICE1:Nakikitira</p>
            </div>
            <div className="hshe">
            <input placeholder={data.ossc2} onChange={(e) =>setOs2(e.target.value)} type="number"/><p>CHOICE2:Umuupa</p>
            </div>
            <div className="hshe">
            <input placeholder={data.ossc3} onChange={(e) =>setOs3(e.target.value)} type="number"/><p>CHOICE3:Sariling  Bahay</p>
            </div>
            <div className="hshe">
            <input placeholder={data.ossc4} onChange={(e) =>setOs4(e.target.value)} type="number"/><p>CHOICE4:Others</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.misc1} onChange={(e) =>setMi(e.target.value)} type="number"/><p>Q4:Buwanang Pangkalahatang kita ng Pamilya?</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.misc1} onChange={(e) =>setMi1(e.target.value)} type="number"/><p>CHOICE1:P1,000 - 4,000</p>
            </div>
            <div className="hshe">
            <input placeholder={data.misc2} onChange={(e) =>setMi2(e.target.value)} type="number"/><p>CHOICE2:P5,000 - 8,000</p>
            </div>
            <div className="hshe">
            <input placeholder={data.misc3} onChange={(e) =>setMi3(e.target.value)} type="number"/><p>CHOICE3:P9,000 - 12,000</p>
            </div>
            <div className="hshe">
            <input placeholder={data.misc4} onChange={(e) =>setMi4(e.target.value)} type="number"/><p>CHOICE4:P13,000 - 18,000</p>
            </div>
            <div className="hshe">
            <input placeholder={data.misc5} onChange={(e) =>setMi5(e.target.value)} type="number"/><p>CHOICE5:P19,000 Above</p>
            </div>
            </div>
            </div>
            <div className="quescontainer">
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.fnsc} onChange={(e) =>setFn(e.target.value)} type="number"/><p>Q5:Ilan ang Miyembro ng Pamilya?</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.fnsc1} onChange={(e) =>setFn1(e.target.value)} type="number"/><p>CHOICE1:11- Pataas</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fnsc2} onChange={(e) =>setFn2(e.target.value)} type="number"/><p>CHOICE2:7 - 10 Members</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fnsc3} onChange={(e) =>setFn3(e.target.value)} type="number"/><p>CHOICE3:4 - 6 Members</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fnsc4} onChange={(e) =>setFn4(e.target.value)} type="number"/><p>CHOICE4:1-3 Members</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.fasc} onChange={(e) =>setFa(e.target.value)} type="number"/><p>Q6:Paano natutustusan ang iyong Pag-aaral</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.fasc1} onChange={(e) =>setFa1(e.target.value)} type="number"/><p>CHOICE1:Suporta ng Magulang</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fasc2} onChange={(e) =>setFa2(e.target.value)} type="number"/><p>CHOICE2:Working Student</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fasc3} onChange={(e) =>setFa3(e.target.value)} type="number"/><p>CHOICE3:Sponsorship</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fasc4} onChange={(e) =>setFa4(e.target.value)} type="number"/><p>CHOICE4:Suporta ng Kamg-anak o Kapatid</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fasc5} onChange={(e) =>setFa5(e.target.value)} type="number"/><p>CHOICE5:Scholarship</p>
            </div>
            <div className="hshe">
            <input placeholder={data.fasc6} onChange={(e) =>setFa6(e.target.value)} type="number"/><p>CHOICE6:Others</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.tssc} onChange={(e) =>setTs(e.target.value)} type="number"/><p>Q7:Uri ng Paaralan?</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.tssc1} onChange={(e) =>setTs1(e.target.value)} type="number"/><p>CHOICE1:Private</p>
            </div>
            <div className="hshe">
            <input placeholder={data.tssc2} onChange={(e) =>setTs2(e.target.value)} type="number"/><p>CHOICE2:Public</p>
            </div>
            <div className="hshe">
            <input placeholder={data.tssc3} onChange={(e) =>setTs3(e.target.value)} type="number"/><p>CHOICE3:ALS</p>
            </div>
            <div className="hshe">
            <input placeholder={data.tssc4} onChange={(e) =>setTs4(e.target.value)} type="number"/><p>CHOICE4:Private(Scholarship,Voucher,Sponsored)</p>
            </div>
            <div className="hshe">
            <input placeholder={data.tssc5} onChange={(e) =>setTs5(e.target.value)} type="number"/><p>CHOICE5:Public(Scholarship,Voucher,Sponsored)</p>
            </div>
            <div className="hshe">
            <input placeholder={data.tssc6} onChange={(e) =>setTs6(e.target.value)} type="number"/><p>CHOICE6:Out of Children</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input placeholder={data.gwasc} onChange={(e) =>setGwa(e.target.value)} type="number"/><p>Q8:General Weighted Average</p>             
            </div>   
            <div className="hshe">
            <input placeholder={data.gwasc1} onChange={(e) =>setGwa1(e.target.value)} type="number"/><p>CHOICE1:96-100</p>
            </div>
            <div className="hshe">
            <input placeholder={data.gwasc2} onChange={(e) =>setGwa2(e.target.value)} type="number"/><p>CHOICE2:91-95</p>
            </div>
            <div className="hshe">
            <input placeholder={data.gwasc3} onChange={(e) =>setGwa3(e.target.value)} type="number"/><p>CHOICE3:86-90</p>
            </div>
            <div className="hshe">
            <input placeholder={data.gwasc4} onChange={(e) =>setGwa4(e.target.value)} type="number"/><p>CHOICE4:81-85</p>
            </div>
            <div className="hshe">
            <input placeholder={data.gwasc5} onChange={(e) =>setGwa5(e.target.value)} type="number"/><p>CHOICE5:80 Below</p>
            </div>
            </div>
            </div>
            </div>
        </>
      )})

  return (
    <>
              <StyledBackdrop open={showBackdrop}>
                <CircularProgress color="inherit" />
              </StyledBackdrop>
    <div className="about">
        <Sidebar/>
        <div className="aboutContainer">
        <Navbar/>
        <div className="top">
          <Card sx={{padding:'10px'}}>
          <h1>Score Card</h1>
          This Score Card will apply to the Scholarship Application Form
          <p>Instructions:</p>
          <p>1.Set the Score for each questions where in the score is equivalent to percentage </p>
          <p>2.All the Questions(Q1-8) must the total value is equivalent to 100 when each questions is sum up </p>
          <p>3.All the CHOICE must a value is not greater than to 100 or less than 0 </p>
          <p>4.The Choices will be the percentage of a questions</p>
          <p>5.Formula: Percentage of Selected Choice divided by 100 times the Specific Questions</p>
          <div className="sheets">
            <div className="hshe">
            <FormControl sx={{ m: 1, minWidth: 400 }}>
            <InputLabel sx={{color:'green'}} id="demo-simple-select-label">Choose Scholarship Category</InputLabel>
            <Select
                 MenuProps={{
                  getContentAnchorEl: null,
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  PaperProps: {
                    style: {
                      width: 850,
                      maxHeight: 250,// Adjust the maximum height of the menu
                    },
                  },
                }}
              autoWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label='Choose Scholarship Category'
              value={schoname} 
              onChange={handleChange}
            >
              {schoprog?.map((item) => (
                  <MenuItem key={item.schoProgId} value={item.name} disabled={item.status === 'closed'}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
           
            </FormControl> 
            </div>
              {scoreCardlist.length > 0 ? (<div className="formscorecard">
              {scoreCardlist}
              </div>) : (<div className="formscorecard">

            <div className="quescontainer">
              <div className="quesco">
               <div className="hshe">
                <input onChange={(e) =>setWl(e.target.value)} type="number"/><p>Q1:Where do yu Live?</p>             
              </div>   

              <div className="hshe">
                <input onChange={(e) =>setWl1(e.target.value)} type="number"/><p>CHOICE1:Subdivision</p>
              </div>

              <div className="hshe">
                <input onChange={(e) =>setWl2(e.target.value)} type="number"/><p>CHOICE2:Sitio/Purok</p>
              </div>

              <div className="hshe">
                <input onChange={(e) =>setWl3(e.target.value)} type="number"/><p>CHOICE3:Depressed Area</p>
                </div>
              </div>

            <div className="quesco">
              <div className="hshe">
               <input onChange={(e) =>setHl(e.target.value)} type="number"/><p>Q2:How Long Do you Live in Marilao?</p>             
             </div>   

              <div className="hshe">
                <input onChange={(e) =>setHl1(e.target.value)} type="number"/><p>CHOICE1:6 Months</p>
              </div>

              <div className="hshe">
                <input onChange={(e) =>setHl2(e.target.value)} type="number"/><p>CHOICE2:1-2 Years</p>
              </div>

              <div className="hshe">
                <input onChange={(e) =>setHl3(e.target.value)} type="number"/><p>CHOICE3:3-4 Years</p>
              </div>

              <div className="hshe">
                <input onChange={(e) =>setHl4(e.target.value)} type="number"/><p>CHOICE4:5 Years</p>
              </div>
            </div>

            <div className="quesco">
            <div className="hshe">
            <input onChange={(e) =>setOs(e.target.value)} type="number"/><p>Q3:House Ownership?</p>             
            </div>   
            <div className="hshe">
            <input onChange={(e) =>setOs1(e.target.value)} type="number"/><p>CHOICE1:boarding</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setOs2(e.target.value)} type="number"/><p>CHOICE2:Renting</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setOs3(e.target.value)} type="number"/><p>CHOICE3:Own House</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setOs4(e.target.value)} type="number"/><p>CHOICE4:Others</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input onChange={(e) =>setMi(e.target.value)} type="number"/><p>Q4:Monthly Income of Family?</p>             
            </div>   
            <div className="hshe">
            <input onChange={(e) =>setMi1(e.target.value)} type="number"/><p>CHOICE1:P1,000 - 4,000</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setMi2(e.target.value)} type="number"/><p>CHOICE2:P5,000 - 8,000</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setMi3(e.target.value)} type="number"/><p>CHOICE3:P9,000 - 12,000</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setMi4(e.target.value)} type="number"/><p>CHOICE4:P13,000 - 18,000</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setMi5(e.target.value)} type="number"/><p>CHOICE5:P19,000 Above</p>
            </div>
            </div>
            </div>

            <div className="quescontainer">
            <div className="quesco">
            <div className="hshe">
            <input onChange={(e) =>setFn(e.target.value)} type="number"/><p>Q5:Number of Family Members?</p>             
            </div>   
            <div className="hshe">
            <input onChange={(e) =>setFn1(e.target.value)} type="number"/><p>CHOICE1:11- Above</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFn2(e.target.value)} type="number"/><p>CHOICE2:7 - 10 Members</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFn3(e.target.value)} type="number"/><p>CHOICE3:4 - 6 Members</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFn4(e.target.value)} type="number"/><p>CHOICE4:1-3 Members</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input onChange={(e) =>setFa(e.target.value)} type="number"/><p>Q6:School Financial Support</p>             
            </div>   
            <div className="hshe">
            <input onChange={(e) =>setFa1(e.target.value)} type="number"/><p>CHOICE1:Support from Parents</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFa2(e.target.value)} type="number"/><p>CHOICE2:Working Student</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFa3(e.target.value)} type="number"/><p>CHOICE3:Sponsorship</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFa4(e.target.value)} type="number"/><p>CHOICE4:Support from Relatives or Siblings</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFa5(e.target.value)} type="number"/><p>CHOICE5:Scholarship</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setFa6(e.target.value)} type="number"/><p>CHOICE6:Others</p>
            </div>
            </div>
            <div className="quesco">
            <div className="hshe">
            <input onChange={(e) =>setTs(e.target.value)} type="number"/><p>Q7:Type of School?</p>             
            </div>   
            <div className="hshe">
            <input onChange={(e) =>setTs1(e.target.value)} type="number"/><p>CHOICE1:Private</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setTs2(e.target.value)} type="number"/><p>CHOICE2:Public</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setTs3(e.target.value)} type="number"/><p>CHOICE3:ALS</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setTs4(e.target.value)} type="number"/><p>CHOICE4:Private(Scholarship,Voucher,Sponsored)</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setTs5(e.target.value)} type="number"/><p>CHOICE5:Public(Scholarship,Voucher,Sponsored)</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setTs6(e.target.value)} type="number"/><p>CHOICE6:Out of Children</p>
            </div>
            </div>

            <div className="quesco">
            <div className="hshe">
            <input onChange={(e) =>setGwa(e.target.value)} type="number"/><p>Q8:General Weighted Average</p>             
            </div>   
            <div className="hshe">
            <input onChange={(e) =>setGwa1(e.target.value)} type="number"/><p>CHOICE1:96-100</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setGwa2(e.target.value)} type="number"/><p>CHOICE2:91-95</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setGwa3(e.target.value)} type="number"/><p>CHOICE3:86-90</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setGwa4(e.target.value)} type="number"/><p>CHOICE4:81-85</p>
            </div>
            <div className="hshe">
            <input onChange={(e) =>setGwa5(e.target.value)} type="number"/><p>CHOICE5:80 Below</p>
            </div>
            </div>
            </div>    
            </div>)}
                <div>
                  <button className='myButton1' onClick={handleSubmit}> Save </button>
                </div>
          </div>
          </Card>
        </div>
        </div>

         
    </div>
    </>
  )
}
