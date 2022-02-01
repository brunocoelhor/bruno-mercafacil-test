export const formatCellphone = (cellphone, client) => {
    const cellphoneNumber: string = cellphone.replace(/\D/g, ''); 

    if (client === 'varejao') {
        return cellphoneNumber;
    }

    const country: string = `+${  cellphoneNumber.slice(0, 2)}`;
    const cellNumber = ` (${ cellphoneNumber.slice(2,4)  }) ${
        cellphoneNumber.slice(4, 9)}-${cellphoneNumber.slice(9, 13)}`;
    
    return country.concat(cellNumber);
};