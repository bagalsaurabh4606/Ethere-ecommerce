import summaryApi from "../comman"

const fetchproductOne=async(category)=>{
const response= await fetch(summaryApi.categoryWiseProductOne.url,{
  method:summaryApi.categoryWiseProductOne.method,
  headers:{
    "content-type":"application/json"
  },
  body:JSON.stringify({
    category:category
  })
})

const dataResponse=await response.json()
return dataResponse
}

export default fetchproductOne;