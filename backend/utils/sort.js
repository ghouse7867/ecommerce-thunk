// const mobilemodel = require('../models/mobilemodel');
// const getsort=(sort)=>{
//     switch(sort){
//         case 'price':
//             return 'price'
//         case 'Brand':
//             return 'Brand'    
//     }
// }
// const sortdirection=(direction)=>{
//     switch(direction){
//         case 'asc':
//             return 1
//         case 'desc':
//             return -1    
//     }
// }
// const getall=(sort,direction)=>{
//     const sortfield=getsort(sort)
//     const sortbydirection=sortdirection(direction)
//     console.log('sort',sortfield,)
//     console.log('dir',sortbydirection)
//     return mobilemodel.find()
//     .sort({[sortfield]:sortbydirection})
// }
// const get = (search,sort,direction) => { 
//     console.log(search)
//     const filter={
//         $or:[
//             {Brand:new RegExp(search,'i')}
//         ]
//     }
//     // }
//     const sortfield=getsort(sort)
//     const sortbydirection=sortdirection(direction)
//     return mobilemodel.find(filter)
//     .sort({[sortfield]:sortbydirection})
     

// };
// const findbyid = (id)
//  => {
//     return mobilemodel.findOne({ _id: id })
// }
// const savemobile = (productData) => {
//     const mobile = new mobilemodel(productData)
//     // console.log('data',productData)
//     return mobile.save()
// }
// const remove = (id)
//  => {
//     return mobilemodel.deleteOne({ _id: id })
// }
// const update = (id, data) => {
//     return mobilemodel.updateOne({ _id: id }, {
//         $set: {
//             Brand: data.Brand,
//             price: data.price,
//             discount: data.discount,
//             inStock: data.inStock,
//             reviews: [
//                 {
//                     username: data.username,
//                     rating: data.rating,
//                     comment: data.comment

//                 }
//             ]
//         }
//     })
// }

// const patch = (id, data) => {
//     delete data._id;
//     const updateobj = {}
//     return mobilemodel.update({ _id: id }, { $set: updateobj })
// }
// module.exports = {
//     get, savemobile, update, remove, patch, findbyid,getall


// }


// backenddcode


//   const onSortChange = (evt) => {
//         const selectedValue = evt.target.value
//         if (selectedValue) {
//             const tokens = selectedValue.split(':')
//             setSort(tokens[0])
//             setDir(tokens[1])
//         } else {
//             setSort('')
//             setDir(null)
//         }
//     }

