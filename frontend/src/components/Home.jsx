import { Link } from 'react-router-dom';
import { SearchMapSection } from './SearchMap'
import { AssessmentSection } from './AssessmentSection';
import { AboutSection } from './AboutSection'

export const Home = () => {
  return (
  <>
    <AboutSection/>
    <SearchMapSection/>
    <AssessmentSection/>
  </>
)}
