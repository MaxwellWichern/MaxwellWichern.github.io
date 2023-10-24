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

export async function getSomething(id) {
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