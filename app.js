// default display none
document.getElementById("error-msg").style.display = "none";
document.getElementById("spinner").style.display = "none"
document.getElementById("show-all").style.display = "none"

// phone search data
const loadData = async () => {
   try {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();
    document.getElementById("spinner").style.display = "block"

    //  clear display
    searchInput.value = "";
    document.getElementById("error-msg").style.display = "none";
    displayClear("phone-show")
    displayClear("details")

    // fetching data
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
   const res = await fetch(url);
   const data = await res.json();
   showDisplayData(data.data)
   } catch (error) {
       errorMessage(error)
       document.getElementById("spinner").style.display = "none"
   }
}
// error message
const errorMessage = () =>{
  document.getElementById("error-msg").style.display = "block";
}
// show ui load data
const showDisplayData = mobiles =>{
  const showPhone = document.getElementById("phone-show");
  document.getElementById("spinner").style.display = "none"
  if(mobiles.length === 0){
    document.getElementById("error-text").innerText = "No result found"
    document.getElementById("show-all").style.display = "none"
  }
  else{
      mobiles.slice(0,20).forEach(mobile => {
         const newDiv = document.createElement("div");
          newDiv.classList.add("col-md-4");
          newDiv.innerHTML = `
          <div class="card card-mobile mt-4">
                  <div>
                      <img src="${mobile.image}" alt="" />
                  </div>
                  <h6>Name: ${mobile.phone_name}</h6>
                  <h6>Brand:${mobile.brand}</h6>
                  <div>
                  <button onclick="loadDetails('${mobile.slug}')" class="mobile-btn">
                  Explore
                </button>
                  </div>
          </div>
          `
          showPhone.appendChild(newDiv);
          document.getElementById("show-all").style.display = "block"
          // clear display
          document.getElementById("error-text").innerText = "";
      });
  }
  // show all mobiles product
 document.getElementById("show-all").addEventListener("click",function(){
  mobiles.slice(21,mobiles.length).forEach(mobile => {
    console.log(mobile)
    const newDiv = document.createElement("div");
     newDiv.classList.add("col-md-4");
     newDiv.innerHTML = `
     <div class="card card-mobile mt-4">
             <div>
                 <img src="${mobile.image}" alt="" />
             </div>
             <h6>Name: ${mobile.phone_name}</h6>
             <h6>Brand:${mobile.brand}</h6>
             <div>
             <button onclick="loadDetails('${mobile.slug}')" class="mobile-btn">
             Explore
           </button>
             </div>
     </div>
     `
     showPhone.appendChild(newDiv);
     // clear display
     document.getElementById("error-text").innerText = "";
 });
 })
}

//  fetching details
const loadDetails = details =>{
  document.getElementById("spinner").style.display = "block"
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(res => res.json())
    .then(data => showDetailsUi(data.data))
}
// show details ui
const showDetailsUi = details => {
    const showDetails = document.getElementById("details");
    document.getElementById("spinner").style.display = "none"
    displayClear("details")
    // sensor
     const sensors = details.mainFeatures.sensors;
    //  others
     const others = details.others;
       
   //  show ui
    const detailDiv = document.createElement("div");
    detailDiv.classList.add("col-md-6")
    detailDiv.classList.add("col-sm-12")
    detailDiv.classList.add("mx-auto")
    detailDiv.innerHTML =`
    <div id="card-item" class="card card-details">
                <div class ="text-center">
                  <img src="${details.image}" alt="" />
                </div>
                <ul id="item-list" class="mt-3">
                  <li>Name: ${details.name}</li>
                  <li>ReleaseDate:${details.releaseDate?details.releaseDate: "coming soon" }</li>
                  <li>Brand: ${details.brand}</li>
                  <li>Memory: ${details.mainFeatures.memory}</li>
                  <li>Display: ${details.mainFeatures.displaySize}</li>
                  <li>Sensors:${sensors.toString()}</li>
                  <li>others :${(others== null? "no others data" :Object.entries(others))}</li>
                </ul>
              </div>
    `
    //  others 
  
    showDetails.appendChild(detailDiv);
}

// clear display 
const displayClear = id => {
  document.getElementById(id).textContent = "";
}
