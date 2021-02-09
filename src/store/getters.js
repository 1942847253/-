export default{
    allCount(state){
        return state.carFoods.reduce((init,food)=>init+food.count,0) 
    },

    allPrice(state){
        return state.carFoods.reduce((init,food)=>init+food.count*food.price,0)
    },

    positiveSize(state){
        return state.ratings.reduce((init,rating)=>init+(rating.rateType===0?1:0),0)
    }
}