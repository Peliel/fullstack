import InputField from './InputField'

const Filter = ({ newKeyword, handleKeywordChange }) => {
  return (
    <div>
      <InputField text="Filter with keywords" value={newKeyword} onChange={handleKeywordChange} />
    </div>
  )
}
  
export default Filter