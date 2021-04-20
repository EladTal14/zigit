import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from '../cmps/Table'
import { getProjects } from '../services/appService'

export function Info() {
  const [projects, setProjects] = useState([])
  const [inDeadline, setInDeadline] = useState(0)
  const [average, setAverage] = useState(0)
  const user = useSelector(({ appModule }) => appModule.user)

  useEffect(() => {
    (async () => {
      setProjects(await getProjects())
    })()
  }, [user])

  useEffect(() => {
    let sum = 0
    let madeDeadline = 0
    projects.forEach(project => {
      sum += project.score
      if (project.madeDadeline === 'true') madeDeadline++
    })
    setInDeadline(((madeDeadline * 100) / projects.length).toFixed(2))
    setAverage((sum / projects.length).toFixed(2))
  }, [projects])

  const data = useMemo(
    () => projects,
    [projects]
  )

  if (Object.keys(user).length === 0) return <div>loading...</div>
  const { name, Team, joinedAt, avatar } = user?.personalDetails
  return (
    <div style={{ margin: "0 auto", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <article style={{ backgroundColor: '#ab8888', minWidth: 489, maxWidth: 489, textAlign: 'center' }}>
        <h1>User Details</h1>
        <h2>Name: {name}</h2>
        <h3>Team: {Team}</h3>
        <h4>Joined at: {joinedAt}</h4>
        <img src={avatar} alt="user" />
      </article>
      <div >Precentage of project that made the deadline: <span style={{ color: `${inDeadline > 50 ? 'green' : 'red'}` }}>{inDeadline}%</span></div>
      <div>Average Score of projects: <span style={{ color: `${average > 50 ? 'green' : 'red'}` }}>{average ? average : 0}</span></div>
      <Table data={data} inDeadline={inDeadline} setInDeadline={setInDeadline} />
    </div>
  )
}