export const request = (path, method, body = null) => {
  let headers = new Headers()
  headers.append('Authorization', `Bearer ${localStorage.getItem('id_token')}`)

  let request = {
    headers: headers,
    cache: 'default',
    method: method
  }
  if (body !== null) {
    request.body = JSON.stringify(body)
  }
  return fetch(`/api/queue/${path}`, request)
}

