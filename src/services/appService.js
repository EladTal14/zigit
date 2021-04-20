import Axios from 'axios'
const API = Axios.create({})
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.authrization = `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  return req
})
export const checkPass = (password) => {
  let capital = 0
  let num = 0
  if (password.length < 8) return 'Password is shorter than 8 letters'
  for (let i = 0; i < password.length; i++) {
    if (password.charCodeAt(i) > 33 && password.charCodeAt(i) < 126) {
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) capital++
      else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) num++
    } else return 'Password must be in english'

  }
  if (!capital) return 'Password must have capital letter'
  if (!num) return 'Password must have number'
  return true
}

export const checkEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export const postUser = async ({ email, password }) => {
  const url = 'https://private-052d6-testapi4528.apiary-mock.com/authenticate'
  const { data } = await API.post(url)
  const userDetails = data[0]
  userDetails.user = { email, password }
  localStorage.setItem('userToken', userDetails.token)
  return userDetails
}

export const getProjects = async () => {
  const url = 'https://private-052d6-testapi4528.apiary-mock.com/info'
  const { data } = await API.get(url)
  data.forEach(project => {
    project.madeDadeline += ''
  });
  return data
}