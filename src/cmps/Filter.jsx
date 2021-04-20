

export function Filter({ filter, setFilter }) {
  return (
    <span>
      Search:{""}
      <input value={filter || ''} onChange={ev => setFilter(ev.target.value)} />
    </span>
  )
}
