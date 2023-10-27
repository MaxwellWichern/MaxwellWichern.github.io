
//use mongoId
export async function deleteSomething(id) {
    try {
        const response = await fetch(`data/testDell/${id}`, {
            method: 'DELETE'
        })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }

        return await response.json()
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export async function getSomething() {
    try {
        const response = await fetch(`data/test`, {
            method: 'GET'
        })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }

        return await response.json()
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export async function addSomething(obj) {
    try {
        const response = await fetch(`data/add`, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                accept: 'application/json'
                },
            body:(JSON.stringify(obj))
        })
        .then((response)=>{return response.json()})
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }

        return await response.json()
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export async function updateById(id, obj) {
  try {
    const response = await fetch(`data/update/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        accept: 'application/json'
      },
      body:(JSON.stringify(obj))
    })
    .then((response)=>{return response.json()})
      if (response.status >= 400) {
          throw new Error(`${response.status}`)
      }

      return await response.json()
  }
  catch (e) {
      console.error(e)
      return null
  }
}

export async function getById(id) {
    const obj = { userId: id }
    console.log(obj)
    try {
        const response = await fetch(`data/getById/${id}`, {
            method: 'GET'
        })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }

        return await response.json()
    }
    catch (e) {
        console.error(e)
        return null
    }
}
