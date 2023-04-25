//using the .env file to store the backend URL
const baseEndpoint = `http://localhost:3001`

// this is how we will fetch the current server time
export const getCurrentTime = () => {
  return async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `mysecrettoken` //adding the authorization
      }
    }

    try {
      const response = await fetch(baseEndpoint + `/api/time`, options)
      if (response.ok) {
        const data = await response.json()
        const time = data.epoch
        console.log(time)
        return time
      } else {
        console.log("error getting a response")
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
