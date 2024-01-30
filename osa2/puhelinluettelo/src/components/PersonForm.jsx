import InputField from "./InputField"

const PersonForm = ( {onSubmit, inputAttributes, buttonText} ) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {inputAttributes.map(inputAttribute => (
          <InputField key={inputAttribute.text} 
                      text={inputAttribute.text}
                      value={inputAttribute.value}
                      onChange={inputAttribute.handleChange}
          />
        ))}
        <button type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  )
}

export default PersonForm