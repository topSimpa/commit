//createController.js
//help create a controller for any model

export default function createController(storage, ModelClass) {
    const create = (dataObject) => {
          const obj = new ModelClass(dataObject)
          
          storage.store(obj);
          console.log(`${ typeof(obj) } ${ obj.id } was created`)
          return obj;
    }

    const get = (id) => {
        const rawObj = storage.get(id);

        if(!rawObj) return null;

        const obj = ModelClass.fromJson(rawObj);
        return obj;
    }

    const getAll = () => {
        const rawCollection = storage.getAll();

        if (!rawCollection) return [];

        //should be returned as a list of object of modelPrototype
        const collection = Object.values(rawCollection).map(
            (rawObj) => ModelClass.fromJson(rawObj)
        );

        return collection;
    }

    const del = (id) => {
        return storage.del(id);
    }

    const createFieldSetter = (fieldName) => {
        if (fieldName.startsWith("_")) {
            throw new Error(`Cannot create a setter for protected field: ${fieldName}`);
        }

        return (id, value) => {
            const obj = get(id);
            if (!obj) throw new Error(`No object found for id: ${id}`);

            if (!Object.keys(obj).includes(fieldName)) {
                throw new Error(`"${fieldName}" is not a field on ${ModelClass.name}`);
            }

            obj[fieldName] = value;
            storage.store(obj);
            return obj;
        };
    };

    return {
        create,
        createFieldSetter,
        del,
        get,
        getAll,
    }
}
