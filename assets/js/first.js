fetch('./assets/js/json/data.json') 
  .then(response => response.json())
  .then(Mydata => { 


    const personalInformation = Mydata.data; 
    console.log(personalInformation)

    function createTable(Mydata) {
       var table = document.createElement("table")
    table.setAttribute('id' , 'table');
      var thead = document.createElement("thead");
      var tbody = document.createElement("tbody");
        tbody.setAttribute('class', 'tbodymonacemebi')
      var tfoot = document.createElement("tfoot"); 


       var headerRow = document.createElement("tr");

      var headerNames = ["სახელი", "პროფესია", "დაბადების ადგილი", 'ზიპ კოდი', "კარიერის დაწყება", "სასურველი ხელფასი"];


       headerNames.forEach(function (headerName){ 
        var th = document.createElement("th");
        
        

        th.textContent = headerName;
        
        headerRow.appendChild(th);
     


 });


 thead.appendChild(headerRow);

 //---------   აქ ვქმნი ინფუთებს და გადვცემ მათ ძებნის ფუნქციებს        ---------------

 var input_byname=document.createElement("input"); 
 input_byname.type= 'text';  //ტიპს თუ გინდა არ განუსაზღვრავ მუშაობს ისედაც
 input_byname.placeholder = 'search by name';
 input_byname.setAttribute('class', 'searchInput');
 input_byname.addEventListener('change', function() {
  avtosearch() ;})

 var input_byprofesii=document.createElement("input");
 input_byprofesii.placeholder = 'search by profesii';
 input_byprofesii.setAttribute('class', 'searchInput2');
 input_byprofesii.addEventListener('change', function() {
  avtosearch2() ;}) 

 var input_byadgili=document.createElement("input");
 input_byadgili.type= 'text'; 
 input_byadgili.placeholder = 'search by place';
 input_byadgili.setAttribute('class', 'searchInput3');
 input_byadgili.addEventListener('change', function() {
  avtosearch3() ;})
 

 var input_byzip=document.createElement("input");
 input_byzip.placeholder = 'search by zip ';
 input_byzip.type= 'number'; 
 input_byzip.setAttribute('class', 'searchInput4');
 input_byzip.addEventListener('change', function() {
  avtosearch4() ;})

 var input_bydawyeba=document.createElement("input");
 input_bydawyeba.placeholder = 'search by Date ';
 input_bydawyeba.type= 'number'; 
 input_bydawyeba.setAttribute('class', 'searchInput5');
 input_bydawyeba.addEventListener('change', function() {
  avtosearch5() ;})
 

 var input_byxelfasi=document.createElement("input");
 input_byxelfasi.placeholder = 'search by salary ';
 input_byxelfasi.setAttribute('class', 'searchInput6');
 input_byxelfasi.addEventListener('change', function() {
  avtosearch6() ;})

 //აქ დავამთავრე ინფუთების შექმნა----------------------------------------------  
 
 //აქ დავიწყე  td შემნა
 var td1 = document.createElement("td"); 
 var td2 = document.createElement("td"); 
 var td3 = document.createElement("td"); 
 var td4 = document.createElement("td"); 
 var td5 = document.createElement("td"); 
 var td6 = document.createElement("td"); 
 //აქ დავიწყე td ზე გადცმა ინფუთების--- (td=თეიბლ დატა)
  td1.appendChild(input_byname); 
 td2.appendChild(input_byprofesii); 
 td3.appendChild(input_byadgili); 
 td4.appendChild(input_byzip); 
 td5.appendChild(input_bydawyeba); 
 td6.appendChild(input_byxelfasi); 
// აქ დავიწყე td გადაცემა tr ბზე ---თეიბლ დატა თეიბლ როვში
 var tr=document.createElement("tr"); 

 tr.appendChild(td1)
 tr.appendChild(td2)
 tr.appendChild(td3)
 tr.appendChild(td4)
 tr.appendChild(td5)
 tr.appendChild(td6)
 //ზემოთ შემქნიი ყველა tr  გადავეცი tabl-ს რითიც გამოჩნდა ჰტმლში
 table.appendChild(tr)



 //--- აქ დავამთვრე ინფუთების შექმნა გამოქვეყნება -----------------------------------

  Mydata.forEach(function (obj) { 
    var row = document.createElement("tr");
   

       
        Object.keys(obj).forEach(function (key) { 


          var cell = document.createElement("td"); 
          
          
          cell.textContent = obj[key]; 
          row.appendChild(cell);   });

        tbody.appendChild(row); 
        
        
       

      });






  var footerRow = document.createElement("tr");
  var footerCell = document.createElement("td");

  footerCell.style.textAlign = "center";
  footerCell.textContent = "სტატუსი: აქტიურია!";
  footerRow.appendChild(footerCell);
  tfoot.appendChild(footerRow);

     
      table.appendChild(thead);
      table.appendChild(tbody);
      table.appendChild(tfoot);

      return table; 
    }

  
    var tableContainer = document.getElementById("tableContainer");

   tableContainer.appendChild(createTable(personalInformation));

  })


  .catch(error => { 
    console.error('Error:', error);
  });



// -----------------------------------------  ძებნა ------------------------------------------------


 async  function avtosearch()  { //ეს ფნქცია იყო ღილაკზე მიბმული, მივაბი input change-ზე
  const keyword = document.querySelector('.searchInput').value;

  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }

  try {
    const data = await fetchJSON();

    if (data) {
      const searchResults = searchByName(data, keyword);
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
};


  async function fetchJSON() {
    try {
      const response = await fetch('./assets/js/json/data.json');
      const jsonData = await response.json();
      
      return jsonData.data; 
      
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return null;
    }
  }

 

 function searchByName(data, keyword) { // ეს ფუნქცია ცვლადი  გადამრვლედება ძებნის მიხედვით
    const results = [];

    for (const entry of data) {
      const name = entry[0].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0], რომელ სტრიქონზე გინდა მოძებნოს
      
      
      if (name.includes(keyword)) {  
        results.push(entry);
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi')
        tbodymonacemebi.style.display="none"
      }
    }

    return results;
  }
 
    


  function displayResults(results) { //ეს ფუნქცია გამოჩენს შედეგს
   
      for (const entry of results) {
        var row=document.createElement("tr") //ყოველ ჯერზე შემქნის tr ყოველ 6 ინფოზე, სხვგან რო შექმნა ურევს 
        entry.forEach((elementx=>{ //ეს ლუპი ამოითებს თითო მონაცემბს
         
         var tdx=document.createElement("td")
         tdx.textContent=elementx
          row.appendChild(tdx)
         table.appendChild(row)

        }
        
        ))

        
      }
  }
  

 


  //-------------------------------------ძებნა პროფესიით ---------------


  async  function avtosearch2()  { //ეს ფნქცია იყო ღილაკზე მიბმული, მივაბი input change-ზე
    const keyword = document.querySelector('.searchInput2').value;
  
    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }
  
    try {
      const data = await fetchJSON();
  
      if (data) {
        const searchResults = searchByprofesii(data, keyword); // აქ იცვლბა ფუნქცის სახელი
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  };

  
  
    function searchByprofesii(data, keyword) {
      const results = [];
 
      for (const entry of data) {
        
        const name2 = entry[1].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
        
        if (name2.includes(keyword)) {  
          results.push(entry);
          var tbodymonacemebi=document.querySelector('.tbodymonacemebi') 
          tbodymonacemebi.style.display="none" // აქ ვაქრობ ბოდის და დასერჩილს შედეგს გამოვაჩენ შემდგომ
          
        }
      }

      return results;
    }
    
  function displayResults(results) {
   

    if (results.length === 0) {
      resultsList.innerHTML = '<li>No results found.</li>';
    } else {
      for (const entry of results) {
        console.log("shemoida")
        var row=document.createElement("tr") //ყოველ ჯერზე შემქნის tr ყოველ 6 ინფოზე, სხვგან რო შექმნა ურევს 
        entry.forEach((elementx=>{
         
         var tdx=document.createElement("td")
         tdx.textContent=elementx
          row.appendChild(tdx)
         table.appendChild(row)

        }
        
        ))

        
      }
    }
  }
   
    


  //------------------------ძებნა დაბადების ადგილით-------------------------

  async  function avtosearch3()  { 
    const keyword = document.querySelector('.searchInput3').value;
  
    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }
  
    try {
      const data = await fetchJSON();
  
      if (data) {
        const searchResults = searchBadgili(data, keyword); // აქ იცვლბა ფუნქცის სახელი
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  };
  
    function searchBadgili(data, keyword) {
      const results = [];
  
      for (const entry of data) {
       
        const name2 = entry[2].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
        
        if (name2.includes(keyword)) {  
          results.push(entry);
          var tbodymonacemebi=document.querySelector('.tbodymonacemebi') 
          tbodymonacemebi.style.display="none" // აქ ვაქრობ ბოდის და დასერჩილს შედეგს გამოვაჩენ შემდგომ
          
        }
      }

      return results;
    }

//-------------------------- seaarc by zip kod----------------------------------

async  function avtosearch4()  { 
  const keyword = document.querySelector('.searchInput4').value;

  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }

  try {
    const data = await fetchJSON();

    if (data) {
      const searchResults = searchByzip(data, keyword); // აქ იცვლბა ფუნქცის სახელი
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
};

  function searchByzip(data, keyword) { //აქ იცვლება ფუნქციის სახელი 
    const results = [];

    for (const entry of data) {
     
      const name2 = entry[3].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
      
      if (name2.includes(keyword)) {  
        results.push(entry);
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi') 
          tbodymonacemebi.style.display="none" // აქ ვაქრობ ბოდის და დასერჩილს შედეგს გამოვაჩენ შემდგომ
          
      }
    }

    return results;
  }

//-------------------------- seaarc by zip kod----------------------------------

async  function avtosearch4()  {  // აქ ცვლი ფუნქცის სახელს ინპუთზე რაც გაქ მიბმული 
const keyword = document.querySelector('.searchInput4').value; //აქ ცვლი კლასს

if (keyword.trim() === '') {
  alert('Please enter a search keyword.');
  return;
}

try {
  const data = await fetchJSON();

  if (data) {
    const searchResults = searchByzip(data, keyword); // აქ იცვლბა ფუნქცის სახელი
    displayResults(searchResults);
  }
} catch (error) {
  console.error('Error fetching or processing JSON:', error);
}
};

function searchByzip(data, keyword) { //აქ იცვლება ფუნქციის სახელი 
  const results = [];

  for (const entry of data) {
   
    const name2 = entry[3].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
    
    if (name2.includes(keyword)) {  
      results.push(entry);
      var tbodymonacemebi=document.querySelector('.tbodymonacemebi') 
          tbodymonacemebi.style.display="none" // აქ ვაქრობ ბოდის და დასერჩილს შედეგს გამოვაჩენ შემდგომ
          
    }
  }

  return results;
}

//-------------search by Date -----------------------------------------------------

async  function avtosearch5()  {  // აქ ცვლი ფუნქცის სახელს ინპუთზე რაც გაქ მიბმული 
  const keyword = document.querySelector('.searchInput5').value; //აქ ცვლი კლასს რაც ინპუთს აქ 

  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }

  try {
    const data = await fetchJSON();

    if (data) {
      const searchResults = searchbydate(data, keyword); // აქ იცვლბა ფუნქცის სახელი
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
};

  function searchbydate(data, keyword) {
    const results = [];

    for (const entry of data) {
     
      const name2 = entry[4].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
      
      if (name2.includes(keyword)) {  
        results.push(entry);
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi') 
        tbodymonacemebi.style.display="none" // აქ ვაქრობ ბოდის და დასერჩილს შედეგს გამოვაჩენ შემდგომ
        
      }
    }

    return results;
  }

  //----------------------------searc  by salary------------------------------------

  async  function avtosearch6()  {  // აქ ცვლი ფუნქცის სახელს ინპუთზე რაც გაქ მიბმული 
    const keyword = document.querySelector('.searchInput6').value; //აქ ცვლი კლასს რაც ინპუთს აქ 
  
    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }
  
    try {
      const data = await fetchJSON();
  
      if (data) {
        const searchResults = searchbysalary(data, keyword); // აქ იცვლბა ფუნქცის სახელი
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  };
  
    function searchbysalary(data, keyword) {
      const results = [];
  
      for (const entry of data) {
       
        const name2 = entry[5].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
        
        if (name2.includes(keyword)) {  
          results.push(entry);
          var tbodymonacemebi=document.querySelector('.tbodymonacemebi') 
          tbodymonacemebi.style.display="none" // აქ ვაქრობ ბოდის და დასერჩილს შედეგს გამოვაჩენ შემდგომ
          
        }
      }
  
      return results;
    }