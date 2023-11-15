
export default function Pagination({
    postPerPage,
    totalPosts,
    currentPage,
    setCurrentPage,
  }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const firstNumber = (currentPage - 1) * postPerPage + 1;
  const lastNumberCal = firstNumber - 1;
  const lastNumber = Math.min(lastNumberCal + postPerPage, totalPosts);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e2e8f0', backgroundColor: '#fff', paddingTop: '0.75rem' }} aria-label="Pagination">
      <div style={{ display: 'block' }}>
        <p style={{ fontSize: '0.875rem', color: '#4a5568' }}>
          Showing <span style={{ fontWeight: '500' }}>{firstNumber}</span> to <span style={{ fontWeight: '500' }}>{lastNumber}</span> of <span style={{ fontWeight: '500' }}>{totalPosts}</span> results
        </p>
      </div>
      <div>
        <button
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', borderRadius: '0.375rem', backgroundColor: '#fff', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#2d3748', border: '1px solid #e2e8f0', transition: 'background-color 0.3s, box-shadow 0.2s' }}
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </button>
        <button
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', borderRadius: '0.375rem', backgroundColor: '#fff', padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: '600', color: '#2d3748', border: '1px solid #e2e8f0', transition: 'background-color 0.3s, box-shadow 0.2s', marginLeft: '0.75rem' }}
          disabled={lastNumber >= totalPosts}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>

  );
}
