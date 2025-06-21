
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
 
  export const isAuthenticated = () => {
    const token = getToken();
    
    return token ? true : false;
  };
  
 
  export const logout = () => {
    localStorage.removeItem('token');
  };
  