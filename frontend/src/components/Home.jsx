import { Link } from 'react-router-dom';
import { SearchMap } from './SearchMap'

export const Home = () => {
  return (
  <>
    <p>homeページです</p>
    <Link to="/spot/new">スポットの登録</Link>
    <SearchMap/>
  </>
)}
