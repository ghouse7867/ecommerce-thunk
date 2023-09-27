class apiFeatures {
    constructor(query, querystr) {
        this.query = query,
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
                name : {
                    $regex : this.querystr.keyword,
                    $options : "i"
                }
        } : {}

    
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const querycopy = {...this.querystr };

        const removeFields = ['page','limit', 'keyword'];

        removeFields.forEach((el) => delete querycopy[el]);

        //Advance

        let querystr = JSON.stringify(querycopy);

        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(querystr));
         
        return this;
    }

    pagination(resPerPage) {
           const currentPage = Number(this.querystr.page) || 1;

           const skip = resPerPage * (currentPage -1);

           this.query = this.query.limit(resPerPage).skip(skip);

           return this;
    }

    
}

module.exports = apiFeatures;