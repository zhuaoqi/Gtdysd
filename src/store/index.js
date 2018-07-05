import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		_logo: false,
		_title: '',
		_msg: false,
		_search: false,
		_topshow: true,
		_bottshow:true,
		_regain: false,
		_back: false,
		_cancel: false,
		_send: false,
		_goinx: false,
		sele: 0,
		height: null,
		width: null,
		islogo: false,
	},
	mutations:{
		selechange(state,value){
			state.sele = value
		},
		_change(state,value){
			state._logo = value._logo
			state._title = value._title
			state._search = value._search
			state._msg = value._msg
			state._cancel = value._cancel
			state._send = value._send
			state._topshow = value._topshow
			state._bottshow = value._bottshow
			state._regain = value._regain
			state._back = value._back
			state._goinx = value._goinx
		},
		sys(state,value){
			state.height = value.height
			state.width = value.width
		},
		cheislogin(state,value){
			state.islogo = value
		}
	}
})
export default store