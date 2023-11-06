
import ReadyButton from '../ReadyButton/ReadyButton'
import Rules from '../Rules/Rules'
import './landingPage.css'
import Logo from './white-logo.png'

export default function LandingPage() {
  return (
    <div className='landing-page-background'>
      <div className="landing-page-logo">
        <img src={Logo} alt="GOMOKU" />
      </div>
        <ReadyButton title="Start Game"/>
        <Rules/>
    </div>
  )
}
