const InputField = ({ text, value, onChange}) => {
  return (
    <div>
      {text}: <input 
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputField