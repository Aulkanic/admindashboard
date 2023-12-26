import React from 'react'
import { CustomHeading } from '../../../../components/H1/h1'

export const ManageStaff = ({officials}) => {
  return (
    <div>
        <div style={{width:'80%'}}>
            <CustomHeading title={'List of Roles'}/>
            <ul className='descript'>
                <li><p><strong>Account Creation</strong> - Responsible for creating employee accounts and assigning access privileges to the MYDO website.</p></li>
                <li><p><strong>Account Management</strong> - Responsible for editing employee details and status.</p></li>
                <li><p><strong>Scholarship Programs</strong> - In charge of creating and managing scholarship programs and their statuses.</p></li>
                <li><p><strong>Score Card</strong> - Responsible for configuring scoring criteria for specific questions and answers on application forms.</p></li>
                <li><p><strong>Requirements Management</strong> - Responsible for creating lists of requirements for specific scholarship programs.</p></li>
                <li><p><strong>Evaluation</strong> - Responsible for evaluating and determining the status of registered applicants.</p></li>
                <li><p><strong>Passing Score and Slots</strong> -  In charge of setting and adjusting passing scores and available slots for specific scholarships.</p></li>
                <li><p><strong>Requirements Verification</strong> - Responsible for checking and verifying documents submitted by applicants.</p></li>
                <li><p><strong>Applicant Management</strong> - Responsible for adding and managing applicant profiles, including marking them as successful or unsuccessful.</p></li>
                <li><p><strong>Appointment Scheduling</strong> -  Responsible for scheduling appointments for qualified applicants and evaluating their interview results.</p></li>
                <li><p><strong>Appointment Management</strong> - Responsible for adding and managing appointments, including marking them as successful or unsuccessful.</p></li>
                <li><p><strong>Scholarship Monitoring</strong> -  In charge of monitoring and managing the activities of scholars.</p></li>
                <li><p><strong>News and Announcements</strong> -  Responsible for creating the latest news and announcements to inform scholars and applicants.</p></li>
                <li><p><strong>Rule Implementation</strong> - Responsible for enforcing the rules and guidelines of the scholarship program.</p></li>
                <li><p><strong>Website Maintenance</strong> - Responsible for regularly updating the content of the website for both applicants and scholars.</p></li>
                <li><p><strong>Reporting</strong> - Responsible for generating summaries and reports on scholarship program data.</p></li>
            </ul>
        </div>
        <div style={{width:'20%'}}>
          <CustomHeading title={'LIST OF STAFFS'} />
        <div className='listofrole'>
            <div className='rolesect'>
            <div>
            {officials.Administrator?.map((data) =>{
                return(
                <>
                <li>{data.role}</li>
                </>
                ) 
            })}
            </div>
            <div>
            {officials.Officer?.map((data) =>{
                return(
                <>
                <li>{data.role}</li>
                </>
                )
                
            })}
            
            </div>
            </div>
            <div className='rolesect'>
            <div>
            {officials.Manager?.map((data) =>{
                return(
                <>
                <li>{data.role}</li>
                </>
                )
                
            })}
            
            </div>
            <div>
            {officials.Coordinator?.map((data) =>{
                return(
                <>
                <li>{data.role}</li>
                </>
                )
            })}
            
            </div>
            </div>
        </div>
        {!btnstaff && 
        <Button onClick={() =>setBtnstaff(true)}>
            <AddIcon sx={{fontSize:'12px'}}/>Add Staff
        </Button>}
        {btnstaff && 
        <Button onClick={() =>setBtnstaff(false)}>
            Close
        </Button>}
        {btnstaff && (
        <>
        <Typography sx={{fontSize:'14px',fontStyle:'italic'}}>Select  staff you want to add</Typography>
        <div className='roleaddbtn'>
            {roles.map((data,index) => (
            <>
            {data.role === 'Administrator' ? (null) : (<label key={index}>
                <input
                type="checkbox"
                className='checkaccess'
                value={data.id}
                checked={selectedModules1.includes(data.role)}
                onChange={() => handleModuleCheckboxChange1(data.role)}
                />
                {data.role}
            </label>)}
            </>
            ))}
        </div>
        <Button sx={{backgroundColor:'blue',color:'white',textTransform:'none'}} variant='contained' onClick={AddRoles}>Add Staff</Button>
        </>
        )}
        
        </div>
        <div style={{marginTop:'20px'}}> 
            <label style={{color:'blue',fontWeight:'bold',fontSize:'16px'}} htmlFor="employee">ROLE</label>
            <Select
                value={jobDes}
                fullWidth
                placeholder='Select roles here ...'
                onChange={handleChange}
                options={roles
                .filter(data => data.role !== 'Administrator')
                .map((option) => ({
                value: option.role,
                label: `${option.role}(${option.total})`
                }))}
            />
        </div>
        <div style={{margin:'15px'}}>
            <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',margin:'5px'}}>
            <label style={{marginLeft:'-15px',color:'blue',fontWeight:'bold',fontSize:'16px',textTransform:'uppercase'}} htmlFor="section">Choose Roles Access here</label>
        </div>
        <div>
            <div className='websacc'>
            {weblist}
            </div>
        </div>
            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end',margin:'10px'}}>
            <button className='btnofficials1' onClick={Authorization}>
                Save Role Access
            </button>
            </div>
        </div>

        <div className='authlist'>
        {accessEmp?.map((data) => {
            const lists = data.accessList?.split(',').map(list => list.trim());
            return (
            <>
            {data.role === 'Administrator' ? null : (<div className='roleacclist' style={{width:'100%',height:'100%'}} key={data.id}>
                <p style={{textTransform:'uppercase',marginTop:'10px'}}>{data.role} access list</p>
                <div className='staffacclist'>
                <ul>
                {lists?.map((list, index) => {
                    if (list === '') return null; 
                    return (
                    <>
                    <li key={index}>
                    {list} <button style={{ backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer',marginLeft:'25px',width:'20px' }} onClick={() => DeleteAuth(list, data)}>x</button>
                    </li>
                    
                    </>
                    );
                })}
                </ul>
                </div>

            </div>)}
            </>
            );
        })}
        </div>
    </div>



  )
}
