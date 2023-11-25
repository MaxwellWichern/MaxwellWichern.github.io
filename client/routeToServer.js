//import { ObjectId } from "mongodb"

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

export async function deleteByName(uName) {
    try {
        const response = await fetch(`data/dellByUserName/${uName}`, {
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

//creds is a json object of the form {userName:"userName", email:"email"}
export async function getUserByUserNameAndEmail(creds){
    try{
        const response = await fetch(`data/getUserByUserNameAndEmail/${creds.userName}/${creds.email}`, {
            method: 'GET'
        })
        .then((response)=>{return response.json()})
        if(response.status >= 400){
            throw new Error(`${response.status}`)
        }
        return await response;
    }catch(e){
        console.error(e);
        return null;
    }
}

//creds is a json object of the form {userName:"userName",userPw:"userPw"}
export async function getUserByCredentials(creds){
    try{
        const response = await fetch(`data/getUserByCredentials/${creds.userName}/${creds.userPw}`, {
            method: 'GET'
        })
        .then((response)=>{return response.json()})
        if(response.status >= 400){
            throw new Error(`${response.status}`)
        }
        return await response;
    }catch(e){
        console.error(e);
        return null;
    }
}

export async function getUserByUsername(username){
    try{
        const response = await fetch(`data/getUserByUsername/${username}`, {
            method: 'GET'
        })
        .then((response)=>{return response.json()})
        if(response.status >= 400){
            throw new Error(`${response.status}`)
        }
        return await response;
    }catch(e){
        console.error(e);
        return null;
    }
}

export async function getUserByEmail(email){
    try{
        const response = await fetch(`data/getUserByEmail/${email}`, {
            method: 'GET'
        })
        .then((response)=>{return response.json()})
        if(response.status >= 400){
            throw new Error(`${response.status}`)
        }
        return await response;
    }catch(e){
        console.error(e);
        return null;
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

//user will be a json object with the following parameters: {userName: string, userPw: string, email: string}
export async function addUser(user) {
    try {
        const response = await fetch(`data/addUser`, {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                accept: 'application/json'
                },
            body:(JSON.stringify(user))
        })
        .then((response)=>{return response.json()})
        if(response.status >= 400){
           throw new Error('${response.status}')
        }
      return await response
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export async function updatePasswordByEmail(email, obj) {
  try {
    const response = await fetch(`data/updatePass/${email}`, {
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

      return await response
  }
  catch (e) {
      console.error(e)
      return null
  }
}

export async function updateUserById(id, obj) {
  try {
    //check valid email
    const user = await getUserByEmail(obj.email)
    if (user.length != 0 && user[0]._id != id) {
      throw new Error("Email already in use, please try again")
    }
    //check valid username
    const user2 = await getUserByUsername(obj.userName)
    if(user2.length != 0 && user2[0]._id != id) {
      throw new Error("Username is already in use, please try another")
    }
    //attempt update
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
      return await response
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

export async function updateKeyInfo(email, key) {
  try {
    const response = await fetch(`data/updateKey/${email}`, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        accept: 'application/json'
      },
      body:(JSON.stringify({'key': `${key.value}`}))
    })
    .then((response)=>{return response.json()})
      if (response.status >= 400) {
          throw new Error(`${response.status}`)
      }
      return await response
  } catch(e) {
    console.error(e)
    return null
  }
}
