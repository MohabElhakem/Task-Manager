const bcrypt= require ('bcrypt');

async function validatePassword (Provided_Password , Hashed_Password){
    return bcrypt.compare(Provided_Password, Hashed_Password)
};

function validateInput (data , schema) {

    const updates = {};

    for (const [key , value] of Object.entries(data)){
        // this loops every field in the object data and turn in into a array [key , value]
        // now here you define what you will do to every array of those 
        
        
        // fist check if the key or field is allowed for the update
        if (!(key in schema)){
            thorw `Invalid field: ${key}`;
        }

        // then see if it has the right value
        const expectedValue = schema[key];
        if (typeof value !== expectedValue ){
            throw ` the field: ${key} must be a '${expectedValue}'`
        }

        // it passed the two condetion now
        updates[key] = value 
        
        //make sure there is atleast one field to update
        if (Object.keys(updates).length === 0 ){
            throw "no vailed fields provided";
        }

    }

    return updates;

}

module.exports = {validateInput,validatePassword};


//#region 
//you must define your schema in the end point and it have all the fields you can update for this endpoint
//first the field then the type of the input you take for that field
//object[key] means to look foe the value if the the key in the object