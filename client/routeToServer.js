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