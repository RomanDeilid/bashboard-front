

const customFetch = async (url, options ,verification ) => {
    // Получаем токен из localStorage или другого хранилища
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    let res
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',

    };
    if (verification) {
        options.headers['Authorization'] = `Bearer ${access_token}`
    }

    let response = await fetch(url, options)
    console.log(response.status)

    if (response.status === 401) {
        if (access_token != null && refresh_token != null) {
            const userId =  localStorage.getItem("user_id");
            if (!userId) {
                sessionStorage.clear()
                localStorage.clear()
                window.location.reload()
                throw new Error("User ID не найден в localStorage");
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Устанавливаем заголовок
                },
                body: JSON.stringify({
                    id: userId,
                    token: refresh_token,
                })
            };

            const response_token = await fetch('http://localhost:3001/api/v1/auth/token', requestOptions)
            const res_token= await response_token.json()
            if (response_token.ok && res_token && res_token.accessToken && res_token.refreshToken) {
                await localStorage.setItem('access_token', res_token.accessToken);
                await localStorage.setItem('refresh_token', res_token.refreshToken);
                options.headers['Authorization'] = `Bearer ${res_token.accessToken}`
                response = await fetch(url, options)
            }
            else {
                sessionStorage.clear()
                localStorage.clear()
                window.location.reload()
                throw new Error(res_token.message);
            }
        }
        else {
            sessionStorage.clear()
            localStorage.clear()
            window.location.reload()
        }
    }
    if (!response.ok) {
        const res=await response.json()
        throw new Error(res.message );
    }
    else if (options.method==="POST" || options.method==="GET"){
        return await response.json()
    }
    else {
        return response
    }

};

export default customFetch;
