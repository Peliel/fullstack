const Notification = ({ message, type }) => {
  if (message == null || type == null) return null
  if (type != "note" && type != "error") return null

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification