import React from 'react';

export const PayoutReport = ({data, columns, details}) => {
  const tableStyle = {
    width: '100%',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px 4px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    width:'76px',
    fontSize:'12px'
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  };
  return (
    <div style={{width:'100vw',padding:'2px'}}>
      <h2 style={{margin:0}}>{details.title}</h2>
      <table style={{...tableStyle,width:'100%',marginTop:'36px',display:'flex',flexDirection:'column'}}>
        <thead style={{width:'100%'}}>
          <tr>
            {columns.map((column) => (
              <th key={column.id} style={thStyle}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{width:'100%'}}>
          {data.map((row,idx) => (
            <tr key={idx}>
              {columns.map((column) => (
                <td key={column.id} style={{...tdStyle,height:'max-content',fontSize:'8px', width: thStyle.width}}>
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
