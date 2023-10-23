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
        const response = await fetch(`data/getUserByUserNameAndEmail`, {
            method: 'GET',
            body: {
                userName: creds.userName,
                email: creds.email
            }
        })
        .then((response)=>{return response.json()})
        if(response.status >= 400){
            throw new Error(`${response.status}`)
        }
        return await response.json();
    }catch(e){
        console.error(e);
        return null;
    }
}

//creds is a json object of the form {userName:"userName",userPw:"userPw"}
export async function getUserByCredentials(creds){
    try{
        const response = await fetch(`data/getUserByCredentials/${creds.userName}`, {
            method: 'GET'
        })
        .then((response)=>{return response.json()})
        //.then((responseJson)=>{return responseJson[0]})
        if(response.status >= 400){
            throw new Error(`${response.status}`)
        }
        /*
        console.log(response)
        console.log(response.length)
        console.log(typeof(response))
        */
        return response;
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