
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
export async function getUserByUserNameAndEmail(creds) {
    try {
        const response = await fetch(`data/getUserByUserNameAndEmail/${creds.userName}/${creds.email}`, {
            method: 'GET'
        })
            .then((response) => { return response.json() })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }
        return await response;
    } catch (e) {
        console.error(e);
        return null;
    }
}

//creds is a json object of the form {userName:"userName",userPw:"userPw"}
export async function getUserByCredentials(creds) {
    try {
        const response = await fetch(`data/getUserByCredentials/${creds.userName}/${creds.userPw}`, {
            method: 'GET'
        })
            .then((response) => { return response.json() })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }
        return await response;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getUserByUsername(username) {
    try {
        const response = await fetch(`data/getUserByUsername/${username}`, {
            method: 'GET'
        })
            .then((response) => { return response.json() })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }
        return await response;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getUserByEmail(email) {
    try {
        const response = await fetch(`data/getUserByEmail/${email}`, {
            method: 'GET'
        })
            .then((response) => { return response.json() })
        if (response.status >= 400) {
            throw new Error(`${response.status}`)
        }
        return await response;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function addSomething(obj, userName) {
    try {
        const authentication = await AuthenticateUser(userName, "add");
        if (authentication) {
            try {
                const response = await fetch(`data/add`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    },
                    body: (JSON.stringify(obj))
                })
                    .then((response) => { return response.json() })
                if (response.status >= 400) {
                    throw new Error('${response.status}')
                }

                return await response
                //return JSON.stringify(response);
            }
            catch (e) {
                console.error(e)
                return null
            }
        }
        else {
            console.error('user not authorized');
            return null;
        }
    } catch (e) {
        console.error('Authentication Error', e)
        return null
    }

}

//user will be a json object with the following parameters: {userName: string, userPw: string, email: string}
export async function addUser(user) {
    try {
        const response = await fetch(`data/addUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: (JSON.stringify(user))
        })
            .then((response) => { return response.json() })
        if (response.status >= 400) {
            throw new Error('${response.status}')
        }
        return await response
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
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: (JSON.stringify(obj))
        })
            .then((response) => { return response.json() })
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

/** checks to see if user has permission to perform action */
async function AuthenticateUser(userName, action) {

    const guestPerms = ["create", "get"];
    const memberPerms = ["create", "add", "delete", "get"];

    //const isGuest = userName.toLowerCase().startsWith('guest');
    let isGuest = true;

    /** check to see if is guest */
    console.log(userName);
    if ((userName.toLowerCase().startsWith('guest')) || userName == "") {
        isGuest = true;
    } else {
        isGuest = false;
    }

    if (isGuest) {
        return (guestPerms.includes(action));

    } else {    /*  not a guest */


        const memberInfo = getUserByUsername(userName);
        console.log(memberInfo);
        console.log(memberInfo.email);
        if (memberInfo.isAdmin == true) {
            return true;
        } else { /** Authenticate as member */
            return (memberPerms.includes(action));

        }
    }
}
