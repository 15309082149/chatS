function formattedDate(timestamp){
   const date = new Date(timestamp);
   const month = (date.getMonth() + 1).toString().padStart(2, '0');  
   const day = date.getDate().toString().padStart(2, '0'); 
   const hour = date.getHours().toString().padStart(2, '0');
   const minute = date.getMinutes().toString().padStart(2, '0');
   const formattedDate = `${month}-${day} ${hour}:${minute}`;  
   return formattedDate
 }

 export default formattedDate
