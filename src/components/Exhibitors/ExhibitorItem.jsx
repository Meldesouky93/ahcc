export default function ExhibitorItem({ exhibitor }) {
    return (
      <div className="exhibitor-item">
        <h3>{exhibitor.name}</h3>
        <p>Booth: {exhibitor.booth}</p>
        <p>Status: {exhibitor.status || 'Not Contacted'}</p>
        <p>Products: {exhibitor.numProducts}</p>
      </div>
    );
  }