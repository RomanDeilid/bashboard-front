export async function Out( ) {

    try {
        sessionStorage.clear()
        localStorage.clear()
        window.location.reload()
    } catch ( err ) {
        console.error( err );
        // тут обработка ошибок
    }

}