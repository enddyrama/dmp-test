export const saveDataToSessionStorage = (name: string, value: object | null, expirationDate?: Date): void => {
    const jsonValue = JSON.stringify(value);
    sessionStorage.setItem(name, jsonValue);

    if (expirationDate) {
        const expirationTimestamp = expirationDate.getTime();
        sessionStorage.setItem(`${name}_expiration`, expirationTimestamp.toString());
    } else {
        sessionStorage.removeItem(`${name}_expiration`);
    }
}

export const getSessionStorage = (name: string): object | null => {
    const jsonValue = sessionStorage.getItem(name);

    if (jsonValue) {
        const value = JSON.parse(jsonValue);
        const expirationTimestamp = sessionStorage.getItem(`${name}_expiration`);

        if (expirationTimestamp) {
            const expirationDate = new Date(parseInt(expirationTimestamp, 60000));

            if (expirationDate.getTime() < Date.now()) {
                sessionStorage.removeItem(name);
                sessionStorage.removeItem(`${name}_expiration`);
                return null;
            }
        }

        return value;
    }

    return null;
}