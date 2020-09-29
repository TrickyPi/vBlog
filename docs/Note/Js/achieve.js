class XPromise {
    constructor(fn){
        if(typeof fn !=='function'){
            throw('promise need get a function');
        }
        this.status = 'pending'
        this.result = null
        this.cbError = null
        this.cbSuccess = null
        function resolve(res){
            this.result = res
            if(this.status === 'pending'){
                setTimeout(()=>{
                    this.status = 'fullied'
                    if(this.cbSuccess){
                        this.cbSuccess(res)
                    }
                })
            }
        }
        function reject(err){
            this.result = err
            if(this.status === 'pending'){
                setTimeout(()=>{
                    this.status = 'rejected'
                    if(this.cbError){
                        this.cbError(err)
                    }
                })
            }
        }
        fn(resolve.bind(this),reject.bind(this))
    }
    then(cb){
        if(this.status === 'pending'){
            this.cbSuccess = cb
        }
        if(this.status === 'fullied'){
            cb(this.result)
        }
        return this;
    }
    catch(cb){
        if(this.status === 'pending'){
            this.cbError = cb
        }
        if(this.status === 'rejected'){
            cb(this.result)
        }
        return this;
    }
}

let forgery =  new XPromise((resolve,reject)=>{
    resolve(2)
})
forgery.then(res=>{
    console.log('resolved')
    console.log(res)
}).catch(err=>{
    console.log('rejected')
    console.log(err)
})

setTimeout(()=>{
    console.log(10)
})