export const formatName = (name, client) => {
    
    if (client === 'varejao') {
        return name;
    }
    
    return name.toUpperCase();
};