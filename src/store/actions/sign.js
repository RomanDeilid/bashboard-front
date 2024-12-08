
export async function In(  login, pass ) {

    try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: login,
                    password: pass
                })
            };
            const response_token =await fetch("http://localhost:3001/api/v1/auth/login", requestOptions)
                .then(response => response.json())
                .catch(error => {console.log("ERROR_GET_AUTH_DATA",error);
                    localStorage.clear()});
             await localStorage.setItem('access_token', response_token.accessToken);
             await localStorage.setItem('refresh_token', response_token.refreshToken);

            if(response_token){

                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${response_token.accessToken}`
                    }}


                        const response_user =await fetch("http://localhost:3001/api/v1/users",requestOptions)
                            .then(response => response.json())
                            .catch(error => console.log("ERROR_GET_AUTH_DATA",error));
                        response_user.map(user=> {
                            if (user.username === login) {
                                localStorage.setItem('user_id', user.id);
                                localStorage.setItem('user_name', user.username);
                            }
                        })
                const response_company =await fetch(`http://localhost:3001/api/v1/companies/user/${localStorage.getItem('user_id')}`,requestOptions)
                        .then(response => response.json())
                        .catch(error => console.log("ERROR_GET_AUTH_DATA",error));
                        localStorage.setItem('company_id', response_company[0].id);
                        localStorage.setItem('company_name', response_company[0].name);
                const response_sheet =await fetch(`http://localhost:3001/api/v1/sheets/company/${response_company[0].id}`, requestOptions )
                        .then( response => response.json())
                        .catch(error => console.log("Error receiving data:",error.message));
                localStorage.setItem('sheet_id', response_sheet[0].id);
                localStorage.setItem("sheet_name",response_sheet[0].name)


            }
        sessionStorage.setItem('authorization', "true");
        // localStorage.setItem('authorization', "true");
        window.location.reload()
    } catch ( err ) {
        console.error( err );

    }

}