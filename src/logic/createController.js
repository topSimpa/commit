//createController.js
//help create a controller for any model

export default function createController(storage, ModelClass) {
    const create = (dataObject) => {
          const rawObj = new ModelClass(dataObject)
          
          const obj = storage.store(rawObj);
          return  JSON.stringify(obj);
    }

    const get = (id) => {
        const obj = storage.get(id) || {};

        return JSON.stringify(obj);
    }

    const getAll = () =>  {
        const collection = storage.getAll();
        return JSON.stringify(collection);
    }

    const del = (id) =>  JSON.stringify(storage.del(id));

    const update = (id, dataObject) => {
        const obj = storage.get(id);

        if (!obj) {
            throw new Error("object not available in database");
        }

        const modelObj = ModelClass.fromJSON(obj);

        for (const [field, value] of Object.entries(dataObject)) {
            if (!Object.keys(modelObj).includes(field)) {
                throw new Error(`"${field}" is not a field on ${ModelClass.name}`);
            }

            modelObj[field] = value;
        }
        
        const updateObj = storage.store(modelObj);
        return JSON.stringify(updateObj);
    }

    return {
        create,
        update,
        del,
        get,
        getAll,
    }
}
