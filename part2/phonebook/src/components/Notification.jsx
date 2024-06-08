const Notification = ({ message, correct }) => {
  const style = {
    color: correct ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  if (message === null) return null

  return <div style={style}>{message}</div>
}

export default Notification

