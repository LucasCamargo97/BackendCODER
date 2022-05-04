import { Response,Request,Context,helpers } from "https://deno.land/x/oak@v10.5.1/mod.ts"

const users = [
    {id:1,first_name:"Lucas",last_name:"Camargo"},
    {id:2,first_name:"Santiago",last_name:"Rolin"}
]

export const getAllUsers = async(context:Context)=>{
    context.response.body={
        payload:users
    }
}

export const getUserById= (context:Context) =>{
    const {id} = helpers.getQuery(context,{mergeParams:true})
    console.log(id)
    context.response.body=id
}
export const getQuery = ({request,response}:{request:Request,response:Response})=>{
    const query = request.url.searchParams.get('uid');
    response.body=query;
}
export const saveUser = async({request,response}:{request:Request,response:Response})=>{
    const body = await request.body();
    const values = await body.value;
    response.body=values;
}