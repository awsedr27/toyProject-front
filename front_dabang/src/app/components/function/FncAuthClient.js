'use client'
export function 
isAuthenticatedClient () {
   if (typeof window != 'undefined') {
    const token = localStorage.getItem('token');
    return !!token;
   } 
   return false;
}

export function getUserTokenClient() {
    if (typeof window != 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }else{
            return null;
        }
    }
}

export function logoutClient(){
    if (typeof window != 'undefined') {
        localStorage.removeItem('token');
    }
}

