import API from './config'

export const getReadings = async (limit = 20) => {
  const response = await API.get(`/api/v1/readings?limit=${limit}`)
  return response.data
}

export const getAlerts = async (limit = 10) => {
  const response = await API.get(`/api/v1/alerts?limit=${limit}`)
  return response.data
}