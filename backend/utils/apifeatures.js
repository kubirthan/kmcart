class APIFeatures {
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
       let keyword =  this.query.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query.find({...keyword})
        return this
    }
}

module.exports = APIFeatures