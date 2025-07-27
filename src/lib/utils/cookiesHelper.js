import Cookies from "js-cookie";

export function setLocalStoreData(key, value) {
    try {
        const serializedValue = JSON.stringify(value);
        Cookies.set(key, serializedValue);
    } catch (error) {
        console.error("Error setting data:", error);
    }
}

export function getLocalStoreData(key) {
    try {
        const serializedValue = Cookies.get(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
        console.error("Error getting data:", error);
        return null;
    }
}

export function deleteLocalStoreData(key) {
    try {
        Cookies.remove(key);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

export function deleteAllLocalStoreData() {
    try {
        const cookies = Object.keys(Cookies.get());
        cookies.forEach((cookie) => Cookies.remove(cookie));
    } catch (error) {
        console.error("Error deleting all cookies:", error);
    }
}