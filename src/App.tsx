import './App.css'
import ToggleSwitch from './ui components/ToggleSwitch/ToggleSwitch'
import SearchIcon from "./assets/icons/Search_Magnifying_Glass.svg"
import BasicInput from './ui components/BasicInput/BasicInput'
import BasicButton from './ui components/BasicButton/BasicButton'

function App() {

  return (
    <>
      <BasicInput 
      label='Label' 
      supportingText='Supporting text' 
      placeholder='Input' 
      showSearchIcon={true} 
      searchIcon={<img src={SearchIcon} className="basic-input-search-icon"/>}
      />

      <BasicButton innerText='TEXT'/>
    </>
  )
}

export default App
