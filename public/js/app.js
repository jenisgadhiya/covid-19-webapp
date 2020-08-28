


function getsname(){
    sname=document.getElementById('sname').value;
    sname=sname.toLowerCase();
    out=document.getElementById('out');
    out.innerHTML="loading....."
    console.log(sname)
    fetch('/covid-19?state='+sname).then(response=>{

    response.json().then(data=>{
        if(data.error){
            html="<h3>state doesnot exists...enter valid state<h3>"
            out.innerHTML=html;
        }else{
            html="<h3>"+data.State+" state covid-19 case details...</h3>"
       
            html+="<h4 class='con'>State: "+data.State+"<br><br>Confirmed: "+data.Confirmed+"<br><br>Active: "+data.Active+"<br><br>Recovered: "+data.Recovered+"<br><br>Deaths: "+data.Death+"<br><br>Last Update:"+data.Lastupdate+"</h4>";
            out.innerHTML=html;
        }
    })

})

    
}

