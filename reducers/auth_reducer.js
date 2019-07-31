import { 
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL,
	GOOGLE_LOGIN_FAIL,
	GOOGLE_LOGIN_SUCCESS

} from '../actions/types'
import {REHYDRATE} from 'redux-persist/es/constants'
export default function(state ={},action){
	switch(action.type){
		case REHYDRATE:
			return action.payload.fb_token ||[]
		case FACEBOOK_LOGIN_SUCCESS:
			return {token:action.payload}
		case FACEBOOK_LOGIN_FAIL:
			return {token:null}
		case GOOGLE_LOGIN_SUCCESS:
			return {googleToken:action.payload}
		case GOOGLE_LOGIN_FAIL:
			return {googleToken:null}
		default:
			return state
	}
}