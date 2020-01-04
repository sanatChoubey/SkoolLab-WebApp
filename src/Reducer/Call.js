
export default function Call (state=null,{type,payload}) {
     if(type==='CALL'){
          return payload 
     }
     else{
          return 'none'
     }

}