import { Link } from 'react-router-dom';
export const Home = () => {
  return (
  <>
    <p>homeページです</p>
    <Link to="/spot/new">スポットの登録</Link>
  </>
)}