const PersonForm = ({formHandler, nameHandler, name, numberHandler, number}) => {
    return (
        <form onSubmit={formHandler} style={{display: "flex", flexFlow: "column", gap: "1rem"}}>
            <div>
                name: <input onChange={nameHandler} value={name} />
            </div>
            <div>
                number: <input onChange={numberHandler} value={number} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm