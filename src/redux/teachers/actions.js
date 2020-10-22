/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import {location,headers} from '../../locations'
import authHeader from '../authHeader'
import {getUserId} from '../users/saveUser'
// teacher list data 
const fetchListRequest=()=>{
    return {
        type:actionTypes.FETCH_LIST_REQUEST
    }
} 
 
const fetchListSuccess=(list)=>{
    return {
        type:actionTypes.FETCH_LIST_PASS,
        payload:list
    }
}

const fetchListFailure=(error)=>{
    return {
        type:actionTypes.FETCH_ERROR,
        payload:error
    }
}

// borrowers list data
const fetchBorrowersRequest=()=>{
    return {
        type:actionTypes.FETCH_BORROWERS_REQUEST
    }
}

const fetchBorrowersSuccess=(borrowers)=>{
    return {
        type:actionTypes.FETCH_BORROWERS_PASS,
        payload:borrowers
    }
}



export const fetchList = ()=>{
    return (dispatch)=>{
        dispatch(fetchListRequest())
const config={
    url:`${location}/teacher/${getUserId()}`,
    method:'get',
    header:headers
}
axios(config).then((resp)=>resp.data)
.then((list)=>{
    dispatch(fetchListSuccess(list))
} )
.catch((resp)=>{
    dispatch(fetchListFailure(resp.response.data.message))
})
    }
}

export const fetchBorrowers = ()=>{
    return (dispatch)=>{
        dispatch(fetchBorrowersRequest())
const config={
    url:`${location}/teacher/borrowers/${getUserId()}`,
    method:'get',
    header:headers
}
axios(config).then((resp)=>resp.data)
.then((borrowers)=>{
    dispatch(fetchBorrowersSuccess(borrowers))
} )
.catch((resp)=>{
    dispatch(fetchListFailure(resp.response.data.message))
})
    }
}
//adding new teacher
const addTeacherFail=(error)=>{
    return{
        type:actionTypes.ADD_TEACHER_FAIL,
        payload:error
    }
}
export const addTeacherPassed=()=>{
    return{
        type:actionTypes.ADD_TEACHER_PASSED
    }
}

export const addNewTeacher= (teacher)=>{
    return (dispatch)=> {
        const data=teacher
        const config={
          url:`${location}/teacher/${getUserId()}`,
          method:'post',
          headers:authHeader,data
        }
        axios(config).then(()=>{
           dispatch(fetchList())
           dispatch(addTeacherPassed())
        }).catch((error)=>{
           dispatch(addTeacherFail(error.response.data.message))
        })
    }
}

export const deleteTeacher= (teacherId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/teacher/${getUserId()}/${teacherId}`,
          method:'delete',
          headers:authHeader
        }
        axios(config).then((resp)=>{
            dispatch(fetchList())
           
        }).catch((error)=>{
            dispatch(addTeacherFail(error.response.data.message))
            alert('teacher is not deleted')
        })
    }
}

export const editTeacherData= (data,teacherId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/teacher/${getUserId()}/${teacherId}`,
          method:'patch',
          headers:authHeader,data
        }
        axios(config).then(()=>{
          dispatch(fetchList())
          dispatch(addTeacherPassed())
        }).catch((error)=>{
            dispatch(addTeacherFail(error.response.data.message))
        })
    }
}
export const lendbook= (data,teacherId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/teacher/lend/${getUserId()}/${teacherId}`,
          method:'post',
          headers:authHeader,data
        }
        axios(config).then((resp)=>{
            dispatch(fetchBorrowers())
            //dispatch(fetchRecords())
            dispatch(addTeacherPassed())
        }).catch((error)=>{
            dispatch(addTeacherFail(error.response.data.message))
        })
    }
}
