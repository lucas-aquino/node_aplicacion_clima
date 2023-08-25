

export const getData = async ( baseURL, params = {} ) => {
  const url = new URL(baseURL)

  Object.keys(params).map( key => {
    url.searchParams.append(key, params[key])
  })

  return fetch(url.toString())
}