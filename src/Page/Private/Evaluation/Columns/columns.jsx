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
          width: 150,renderCell: (params) => (
                <div>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() =>handleModalOpen('detail',true)}
                  >
                    View Detail
                  </button>
                </div>
        ),
        },
        {field: 'score',headerName: 'Details',headerClassName: 'super-app-theme--header',
           width: 200,renderCell: (params) => {
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
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>}
                {status === 'Failed' && (<>
                {params.row.grantedAccess === '' || !params.row.grantedAccess ? (
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  
                onClick={() =>handleModalOpen('access',true)}>
                Access
                </button>) : (
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => setFirsttoSecStat(params.row)}>
                Add to Applicants List
                </button>)}
                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
            width: 150,
            renderCell: () => (
                <>
                <div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() =>handleModalOpen('detail',true)}
                  >
                    View Detail
                  </button>
                </div>
              </>
            ),
        },
        {
          field: 'score',
          headerName: 'Details',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => {
            return(
            <div>
            <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => setFirsttoSecStat(params.row)}>
            Add to Applicants List
            </button>
            </div>)
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
            width: 150,
            renderCell: () => (
                <div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() =>handleModalOpen('detail',true)}
                  >
                    View Detail
                  </button>
                </div>
            ),
        },
        {
          field: 'grantedAccess',
          headerName: 'Details',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => {
            console.log(params.row)
            return(
              <>
              <div>
            {params.row.grantedAccess === '' || !params.row.grantedAccess ? (
            <button cclassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>handleModalOpen('access',true)}>
            Access
            </button>
            ) : (
            <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => setFirsttoSecStat(params.row)}>
            Add to Applicants List
            </button>
            )}
            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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