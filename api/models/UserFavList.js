var UserFavList = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        owner: {
            model : 'user'
        },
        favorits : {
            collection : 'profile'
        }
    }

};

module.exports = UserFavList;
