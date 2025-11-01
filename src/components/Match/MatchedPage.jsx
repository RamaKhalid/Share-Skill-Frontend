import { useLocation } from 'react-router-dom';

function MatchedPage() {
    const location = useLocation();
    // const { productId, productName } = location.state || {};
  return (
    <div>MatchedPage</div>
  )
}

export default MatchedPage