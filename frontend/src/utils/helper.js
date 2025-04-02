const validEmail =  (email) => {    
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}