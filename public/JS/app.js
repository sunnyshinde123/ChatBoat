async function deleteChat(id){
  try{
    console.log(id);
    let url=`http://localhost:7080/chats/${id}`;
    console.log(url);
    let response=await fetch(url, {
      method:'DELETE'
    });

    if(!response.ok){
      throw new Error(`Error ${response.statusText}`);
    }

    let res=await response.json();
    console.log(res);
    window.location.href='/chats';
  }catch(err){
    console.log(err);
  }
}