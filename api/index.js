import axios from "axios";

const auth =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19sb2dpbiI6ZmFsc2UsInJlcXVlc3RfdXVpZCI6IjZiMzU0Nzg4LTg0ZjEtNDFhZC1hOTkxLTk5MmFmZmM2YzI1NiIsImRldmljZV90eXBlIjoid2ViIiwiZGV2aWNlX3Rva2VuIjoid2ViIiwiYXBwX3ZlcnNpb24iOiIiLCJvc192ZXJzaW9uX2NvZGUiOiJ3ZWIiLCJpYXQiOjE1NDY5NDMzNTd9.ZtjmbUqyIK7lmbupHCBvf7ZDgLqcy-AP98InbleaEgI";

const api = (() =>
  axios.create({
    baseURL: process.env.VUE_APP_APIURL,
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  }))();

async function getURLData (url) {
  try {
    const response = await api.get('core/v1/url_meta', {params: { url }})
    return response.data
  } catch (error) {
    throw error
  }
}

async function getNewToken () {
  try {
    const data = {
      app_version: '',
      device_token: 'web',
      device_type: 'web',
      os_version_code: 'web'
    }
    const response = await api.post('/auth/token', data)
    return response.data
  } catch (e) {
    throw e
  }
}

export {api, getURLData, getNewToken}
