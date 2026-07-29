//createStorage.js

export default function createStorage(key) {
    const storage = JSON.parse(localStorage.getItem(key) ?? "{}");

    const persist = () => localStorage.setItem(key, JSON.stringify(storage));

    return {
        store: (item) => { 
            storage[item.id] = item; 
            persist(); 
        },
        get: (id) => storage[id],
        getAll: () => storage,
        del: (id) => { 
            delete storage[id]; 
            persist(); 
            return true;
        },
    };
}