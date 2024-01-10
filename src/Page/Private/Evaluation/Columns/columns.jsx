import React from 'react'

const Cols = (handleModalOpen,passSlot,setFirsttoSecStat,failed) =>{
  let colList;
 return colList = {
    columns:[
        {field: 'SchoIarshipApplied',headerName: 'Scholarship Applied',headerClassName: 'super-app-theme--header',
          width: 250,editable: false,
        },
        {field: 'Name',headerName: 'Name',headerClassName: 'super-app-theme--header',
          width: 250,editable: false,
        },
        {field: 'DateApplied',headerName: 'Date Applied',headerClassName: 'super-app-theme--header',
          width: 150,editable: false,
        },
        {field: 'status',headerName: 'Status',headerClassName: 'super-app-theme--header',
          width: 100,editable: false,
        },
        {field: 'stat',headerName: 'Score',headerClassName: 'super-app-theme--header',
          width: 90,editable: false,
          renderCell: (params) =>(
            <p>{params.row.score}/100</p>
          ),
        },
        {field: 'insert',headerName: 'Actions',headerClassName: 'super-app-theme--header',
          width: 100,renderCell: (params) => (
                <div>
                <button 
                onClick={() =>handleModalOpen('detail',true)}>View Details</button>
                </div>
        ),
        },
        {field: 'score',headerName: 'Details',headerClassName: 'super-app-theme--header',
           width: 220,renderCell: (params) => {
              let status
              if(params.value >= passSlot.passingscore){
                status = 'Passed'
              }
              if(params.value < passSlot.passingscore){
                status = 'Failed'
              }
              return(
                <div>
                {status === 'Passed' && 
                <button className="btnofficials"
                onClick={() => setFirsttoSecStat(params.row)}>
                    Add to Applicants List
                </button>}
                {status === 'Failed' && (<>
                    {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button className='btnofficials1'  
                onClick={() =>handleModalOpen('access',true)}>
                    Access</button>) : (
                <button className="btnofficials"
                    onClick={() => setFirsttoSecStat(params.row)}>
                    Add to Applicants List
                    </button>)}
                    <button className='btnofficials2' style={{marginLeft:'10px'}}
                    onClick={() => failed(params.row)}>
                    Failed
                </button>
                    </>)}
                </div>)
            },
          },
    
      ],
    passedColumn:[
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          headerClassName: 'super-app-theme--header',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          headerClassName: 'super-app-theme--header',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            headerClassName: 'super-app-theme--header',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='myButton'
                onClick={() =>handleModalOpen('detail',true)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'score',
            headerName: 'Details',
            headerClassName: 'super-app-theme--header',
            width: 250,
            renderCell: (params) => {
              return(
                <>
                <div style={{width:"100%",display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
              <button className="btnofficials"
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>
              </div>
              </>)
            },
          },
    
      ],
    failedColumn:[
        {
          field: 'SchoIarshipApplied',
          headerName: 'Scholarship Applied',
          headerClassName: 'super-app-theme--header',
          width: 250,
          editable: false,
        },
        {
          field: 'Name',
          headerName: 'Name',
          headerClassName: 'super-app-theme--header',
          width: 250,
          editable: false,
        },
        {
          field: 'DateApplied',
          headerName: 'Date Applied',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 100,
          editable: false,
        },
        {
          field: 'stat',
          headerName: 'Score',
          headerClassName: 'super-app-theme--header',
          width: 90,
          editable: false,
          renderCell: (params) =>(
            <>
            <p style={{margin:'0px'}}>{params.row.score}/100</p>
            </>
          ),
        },
        {
            field: 'insert',
            headerName: 'Actions',
            headerClassName: 'super-app-theme--header',
            width: 100,
            renderCell: (params) => (
                <>
                <div style={{display:'flex',flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <button className='btnofficials1'
                onClick={() =>handleModalOpen('detail',true)}>View Details</button>
                </div>
              </>
            ),
          },
          {
            field: 'grantedAccess',
            headerName: 'Details',
            headerClassName: 'super-app-theme--header',
            width: 250,
            renderCell: (params) => {
              console.log(params.row)
              return(
                <>
                <div style={{width:"100%",display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
              {params.row.grantedAccess === '' || !params.row.grantedAccess ? (<button className='btnofficials1'
              onClick={() =>handleModalOpen('access',true)}>
                Access</button>) : (<button className="btnofficials" 
              onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button className='btnofficials2' style={{marginLeft:'5px'}}
              onClick={() => failed(params.row)}>
                Failed
                </button>
              </div>
              </>)
            },
          },
    
    ]}
}

export default Cols