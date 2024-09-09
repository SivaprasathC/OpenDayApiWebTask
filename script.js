//diplaying departments in home page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
fetch("http://openday.kumaraguru.in/api/v1/departments/")
.then(response=> response.json())
.then(res=>{
    const data=res;
    let depts='';
    data.forEach(depart => {
       depts+=`<div onclick="clicked(this);" id="${depart.id}" class="depts"><h3>${depart.name}</h3></div>`

    })
    document.getElementById('alldepartments').innerHTML=depts;
})
.then(() => {
  this.pagin();
})
.catch(err=>document.getElementById('alldepartments').innerHTML=`<div style="text-align: center;font-family: Georgia, 'Times New Roman', Times, serif;color: red;"><h2>Error! Some Error in Fetching Data</h2><h4>Error Details:${err}</h4></div>`)

//search!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const search = () => {
   
  const searchbox =document.getElementById("search-dept").value.toUpperCase();
  const storeitems = document.getElementById("alldepartments")
  const depts = document.querySelectorAll(".depts")
  const dname = storeitems.getElementsByTagName("h3")
  for (var i = 0; i < dname.length; i++) {
        let match=depts[i].getElementsByTagName('h3')[0];
        let textvalue = match.textContent
              if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
                       depts[i].style.display = "";
                       if (searchbox==""){
                        pagin();
                      }
                } else {
                   depts[i].style.display = "none";
               }
    }
  }

//pagination!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function pagin()
{
const cardsPerPage = 100; // Number of cards to show per page 
const dataContainer = document.getElementById('container'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 

const cards = 
    Array.from(dataContainer.getElementsByClassName('depts')); 

// Calculate the total number of pages 
const totalPages = Math.ceil(cards.length / cardsPerPage); 
let currentPage = 1; 

// Function to display cards for a specific page 
function displayPage(page) { 
    const startIndex = (page - 1) * cardsPerPage; 
    const endIndex = startIndex + cardsPerPage; 
    cards.forEach((card, index) => { 
        if (index >= startIndex && index < endIndex) { 
            card.style.display = 'block'; 
        } else { 
            card.style.display = 'none'; 
        } 
    }); 
} 

// Function to update pagination buttons and page numbers 
function updatePagination() { 
    pageNumbers.textContent = 
        `Page ${currentPage} of ${totalPages}`; 
    prevButton.disabled = currentPage === 1; 
    nextButton.disabled = currentPage === totalPages; 
    pageLinks.forEach((link) => { 
        const page = parseInt(link.getAttribute('data-page')); 
        link.classList.toggle('active', page === currentPage); 
    }); 
} 

// Event listener for "Previous" button 
prevButton.addEventListener('click', () => { 
    if (currentPage > 1) { 
        currentPage--; 
        displayPage(currentPage); 
        updatePagination(); 
    } 
}); 

// Event listener for "Next" button 
nextButton.addEventListener('click', () => { 
    if (currentPage < totalPages) { 
        currentPage++; 
        displayPage(currentPage); 
        updatePagination(); 
    } 
    
}); 

// Event listener for page number buttons 
pageLinks.forEach((link) => { 
    link.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const page = parseInt(link.getAttribute('data-page')); 
        if (page !== currentPage) { 
            currentPage = page; 
            displayPage(currentPage); 
            updatePagination(); 
        } 
    }); 
}); 

// Initial page load 
displayPage(currentPage); 
updatePagination();
}

//getting id of a div when it is clicked replace in fetchh
// function clicked(item) {
//     id= $(item).attr("id")
//     url=`http://openday.kumaraguru.in/api/v1/department/${id}`
//     fetch(url)
//     .then(response=> response.json())
//     .then(res=>{
//      console.log(res)
//      depname=`<h1>${res.name}</h1>`
//      descp=`<h2>${res.description}</h2>`
//      document.getElementById('name').innerHTML=depname;
//      document.getElementById('detail').innerHTML=descp;
//      window.location.href = "department.html";
//  })}

function clicked(item) {
    id= $(item).attr("id")
    url=`http://openday.kumaraguru.in/api/v1/department/${id}`
    fetch(url)
    .then(response=> response.json())
    .then(res=>{
     console.log(res)
     depname=`<h1>Department Name:${res.name}</h1>`
     departimage=`<img src="https://picsum.photos/id/${id}/200/300" alt="department${id}"></img>`
     descp=`<h2>Description:${res.description}</h2>
     <br>
     <br>
     <h2>Block:${res.block}</h2>
     <br>
     <br>
     <h2>Link:<a href=${res.link}>${res.link}</a></h2>`
     localStorage.depname= depname; 
     localStorage.descp= descp;
     localStorage.departimage= departimage;
     window.location.href = "department.html";
 })}
