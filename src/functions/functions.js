export async function FETCH_DATA ({ route, CLIENT_ID, access_token, searchParams }) {
  const result = await fetch(route, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Client-ID': `${CLIENT_ID}`,
      Authorization: `Bearer ${access_token}`
    },
    body: searchParams
  })
  const data = await result.json()
  return data
}
