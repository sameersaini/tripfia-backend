const getEnvData = (env) => ({
    local: {
        mongo: {
            url: 'mongodb://localhost:27017/tripfia'
        }
    },
    prod: {
        mongo: {
            url: 'mongodb+srv://tripfia:tripfia@cluster0.fygrf.mongodb.net/tripfia?retryWrites=true&w=majority'
        }
    }
}[env]);

module.exports = getEnvData;