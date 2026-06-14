let clientname;

let name_message = prompt("Welcome to Doite. What's your name?");

if (name_message === ("")) {
    
    clientname = "Visitor";

} 
else if (name_message === null){

  clientname = "Visitor";

}
else {

clientname = name_message;

}
let clientage;
let age_message = prompt("What's your age?");
if (age_message < 12){
    clientage = "Kid";
    }
else if (age_message <= 17){
    clientage = "Young Man";          
    }
else if (age_message <= 64){
    clientage = "Adult";
}
 else if (age_message >= 65){
    clientage = "Senior"
 }

let clientconfirmation;
let clientconfirmation_message = confirm("Are you a customer?");
if (clientconfirmation_message === true){

    clientconfirmation = "Yes";
}
else {

    clientconfirmation = "No";
}

let activity;
let activity_message = prompt("what's the activity you want to practice? Camping, Trekking, Running or Other?");
if (activity_message === "Camping"){

    activity = "Tents, Sleeping bags and Portable stoves";
}
else if (activity_message === "Trekking"){

    activity = "Boots, Trekking poles and Technical backpacks";
}
else if (activity_message === "Running"){
    
    activity = "Trail runners, Technical clothing and Accessories";
}
else{

    activity = "Visits our section of new arrivals";
} 
    
alert(`Client: ${clientname}
       Category: ${clientage}
       Activity: ${activity_message}
       Frequent customer: ${clientconfirmation}
       
       We recommend: ${activity}`);


 
 



            