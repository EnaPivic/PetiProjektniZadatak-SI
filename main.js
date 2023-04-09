    //THIS IS WHERE YOU PASTE THE CODE TO CONNECT TO YOUR OWN DATABASE
        //Copy and paste the CDN bit of code from your app that you created on Firebase.
        //The script tag above is already there, so careful not to have duplicate script tags.
        //After you've copied and pasted, just delete the unnecessary script tags. 
    // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCaPbtvoBZ6DcSd94HVNBP5bsJmpNUdj2Y",
    authDomain: "fbase-proj.firebaseapp.com",
    databaseURL: "https://fbase-proj-default-rtdb.firebaseio.com",
    projectId: "fbase-proj",
    storageBucket: "fbase-proj.appspot.com",
    messagingSenderId: "725907087760",
    appId: "1:725907087760:web:720ccf787397aa1b00d315",
    measurementId: "G-JRBMLMXJ2D"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

        import {getDatabase, ref, get, set, child, update, remove}
        from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js"
        

        const db = getDatabase();

        var enterID = document.querySelector("#studentIndex");
        var enterName = document.querySelector("#firstName");
        var enterLast = document.querySelector("#lastName");
        var cgpa = document.querySelector("#cgpa");
        var allInputs = document.querySelectorAll('input');

        var findID = document.querySelector("#searchStudentIndex");
        var findName = document.querySelector("#findName");
        var findLast = document.querySelector("#findLast");
        var findCGPA= document.querySelector("#findCGPA");


        var insertBtn = document.querySelector("#submit");
        var removeBtn = document.querySelector("#remove");
        var findBtn = document.querySelector("#getStudentByIndex");

        function InsertData() {
            set(ref(db, "Students/"+ enterID.value),{
                ID: enterID.value,
                FirstName: enterName.value,
                LastName: enterLast.value,
                cgpa: cgpa.value
            })
            .then(()=>{
                alert("Data added successfully");
            })
            .catch((error)=>{
                alert(error);
            });
            allInputs.forEach(singleInput => singleInput.value = '');
        }

        function FindData() {
            const dbref = ref(db);

            get(child(dbref, "Students/" + findID.value))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    findName.innerHTML = "First Name: " + snapshot.val().FirstName;
                    findLast.innerHTML = "Last Name: " + snapshot.val().LastName;
                    findCGPA.innerHTML = "CGPA: " + snapshot.val().cgpa;

                } else {
                    alert("No data found");
                }
            })
            .catch((error)=>{
                alert(error)
            })
            allInputs.forEach(singleInput => singleInput.value = '');

            
        }

        function RemoveData(){
            const dbref2 = ref(db);
            get(child(dbref2, "Students/" + findID.value))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    remove(ref(db, "Students/"+ enterID.value))
                    alert("Data deleted successfully");

                } else {
                    alert("Data not found");
                }
            })
            .catch((error)=>{
                alert(error);
            });
            allInputs.forEach(singleInput => singleInput.value = '');

        }

        insertBtn.addEventListener('click', InsertData);
        removeBtn.addEventListener('click', RemoveData);
        findBtn.addEventListener('click', FindData);
