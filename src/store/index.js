import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
    state:{
        goodsList:[]
	},
	mutations:{
		addGoods:(state,data)=>{
				state.goodsList.push(data)
        },
        deleteGoods(state,index){
			state.goodsList.splice(index,1);    
   		},
   		updateGoods(state,data){
    //index为操作第几个元素，key为要改变的key,value为新的值
	       const {index,key,value}=data;
	       state.goodsList[index][key]=value;
   		},
   		clearGoods(state){
   			state.goodsList = []
   			console.log(state.goodsList)
   		}
	},
	actions:{
		addCart(context,item){
			var idE=context.state.goodsList.find((list)=>{
				return item.coupon_id==list.id
				})
			if(!idE){
				var data={
					url:item.url,
					title:item.title,
					zk_price:item.zk_price,
					raw_price:item.raw_price,
					number:1,
					select:false,
					id:item.coupon_id,
					pic:item.thumbnail_pic,
					select:true
				}
				context.commit('addGoods',data)
			}else{
			    return alert("已加入购物车")
			}
		}
	},
	getters: {
		goodsNumber:state=>{
            return state.goodsList.length
        },
        totalPrice:state=>{
        	let list=state.goodsList
        	let totalPrice = 0
        	if(state.goodsList.length>0){
        		for(let i=0;i<state.goodsList.length;i++){
        			if(list[i].select){
        				totalPrice = list[i].number * list[i].zk_price +totalPrice
        			}
        		}
        	}else{
        		return 0;
        	}
        	return (totalPrice).toFixed(1)
        }
	}

})