firebase.database().ref().child("users/0").set({

    username : "custom",
    password: "custom",
    isAdmin: true
});

var ref=firebase.database().ref("gradesList");
ref.on('value',function(snapshot){

    data=snapshot.val();
    console.log("data is",data);

});                                  

var loggedUserName="";
var isAdmin="";
var data;

function loginUser(){

    document.getElementsByClassName("questions")[0].style.display="none";
    var username=document.getElementById("name").value;
    var password=document.getElementById("password").value;
    var array=[];
    firebase.database().ref("users").on('value',function (snapshot){

        array=snapshot.val();
        console.log("array",array);
        for(let i=0;i<array.length;i++){

            console.log("username",array[i].username);
            
            if(array[i].username==username && array[i].password==password && username.length!=0 && password.length!=0){
    
       var welcomemsg= document.querySelector("#welcome").innerHTML="WELCOME " + array[i].username;
       
       welcomemsg.className="show";
        loggedUserName=array[i].username;
        isAdmin=array[i].isAdmin;
        document.getElementsByClassName("userspage")[0].id="hide";

        if(isAdmin){

          
            document.getElementsByClassName("welcomepage")[0].id="show";
            document.getElementsByClassName("adminpage")[0].id="show";
            var ref=firebase.database().ref("gradesList");
            ref.on('value',function(snapshot){

                data=snapshot.val();
                console.log("data is",data);

            });


            for(let i=0;i<data.length;i++){

                var node=document.createElement("li");
                node.className="grade";
                var li=document.getElementsByClassName("sidedata")[0].appendChild(node).innerHTML="<h2>"+data[i].name +"</h2><br/><br/>";
               console.log("li",li);

               var ul= document.createElement("ul");
               console.log("ul",ul);



               /*1 for ends*/


              for(let j=0;j<data[i].subjectList.length;j++){
                
                node.appendChild(ul);
                 li=document.createElement("li");
                 li.className="subject";
                 console.log("subject li",li);
                 
                 li.innerHTML="<u><strong>"+data[i].subjectList[j].name+"</strong></u>";
                console.log("li",li);
               console.log("li is",li);
               ul.appendChild(li);

                ul=document.createElement("ul");



//second

               for(let k=0;k<data[i].subjectList[j].chapterList.length;k++){

                li.appendChild(ul);

                li=document.createElement("li");
                li.setAttribute("onclick","getQuestion(event)");
                li.className="chapter";
            
                li.innerHTML=data[i].subjectList[j].chapterList[k].name;

                ul.appendChild(li);


               }
              }

            }



        }

        else{


            document.getElementsByClassName("welcomepage")[0].id="show";
            document.getElementsByClassName("adminpage")[0].id="show";
            var ref=firebase.database().ref("gradesList");
            ref.on('value',function(snapshot){

                data=snapshot.val();
                console.log("data is",data);

            });


            for(let i=0;i<data.length;i++){

                var node=document.createElement("li");
                node.className="grade";
                var li=document.getElementsByClassName("sidedata")[0].appendChild(node).innerHTML="<h2>"+data[i].name +"</h2><br/><br/>";
               console.log("li",li);

               var ul= document.createElement("ul");
               console.log("ul",ul);



               /*1 for ends*/


              for(let j=0;j<data[i].subjectList.length;j++){
                
                node.appendChild(ul);
                 li=document.createElement("li");
                 li.className="subject";
                 console.log("subject li",li);
                 
                 li.innerHTML="<u><strong>"+data[i].subjectList[j].name+"</strong></u>";
                console.log("li",li);
               console.log("li is",li);
               ul.appendChild(li);

                ul=document.createElement("ul");



//second

               for(let k=0;k<data[i].subjectList[j].chapterList.length;k++){

                li.appendChild(ul);

                li=document.createElement("li");
                li.setAttribute("onclick","getQuestion(event)");
                li.className="chapter";
            
                li.innerHTML=data[i].subjectList[j].chapterList[k].name;

                ul.appendChild(li);


               }
              }

            }


        }
       
    }

    else{

    }
    
    }

    });



}

function getQuestion(event){

    document.getElementsByClassName("questions")[0].innerHTML="";
    document.getElementsByClassName("questions")[0].style.display="block";
console.log("event",event.target);
   var text=event.target.innerHTML;
   var ref=firebase.database().ref("gradesList");
ref.on('value',function(snapshot){

    data=snapshot.val();



    for(let i=0;i<data.length;i++){
       /*1 for ends*/


      for(let j=0;j<data[i].subjectList.length;j++){
        

       for(let k=0;k<data[i].subjectList[j].chapterList.length;k++){

       
    
        if(event.target.innerHTML==data[i].subjectList[j].chapterList[k].name){

            console.log("found",data[i].subjectList[j].chapterList[k].name);
            for(let l=0;l<data[i].subjectList[j].chapterList[k].questionList.length;l++){

               var quesdiv= document.createElement("div");

               quesdiv.className="question " + (data[i].subjectList[j].chapterList[k].name.trim());
               quesdiv.innerHTML="<strong>QUES)</strong> "+data[i].subjectList[j].chapterList[k].questionList[l].question;
               console.log("quesdiv",quesdiv);

               var ansdiv= document.createElement("div");
               ansdiv.innerHTML="<strong>ANS)</strong> "+ data[i].subjectList[j].chapterList[k].questionList[l].answer+"<br/><br/>";
              

               ansdiv.className="question " + (data[i].subjectList[j].chapterList[k].name.trim());

               document.getElementsByClassName("questions")[0].appendChild(quesdiv);
               document.getElementsByClassName("questions")[0].appendChild(ansdiv);

               console.log("appended finally", document.getElementsByClassName("questions")[0]);
               
    //   var questions=document.getElementsByClassName("question");
    //   if(questions[l].className.trim()!=event.target.innerHTML){

    //     questions[l].id="hide";
    //   }

    //   else{

    //     questions[l].id="show";
    //   }
             
               
            }
            


        }



       }
      }



    }

   

}); 




}

var userCount=1;



function signInUser(){

    var array=[];
    var flag=0;
    
    var username=document.getElementById("name").value;
    var password=document.getElementById("password").value;
    firebase.database().ref("users").on('value',function (snapshot){

        array=snapshot.val();
        console.log("array",array);

    });

    console.log("flag",flag);

    
    for(let i=0;i<array.length;i++){

        if(array[i].username==username){

            console.log("inside if");
            flag=1;
        }
    }

    if(flag){

        alert("duplicate");

    }

    else{

   var database=firebase.database().ref("users");
   database.child(userCount).set({

    username: username,
    password: password,
    isAdmin: false
});
   
userCount++;

    }

}