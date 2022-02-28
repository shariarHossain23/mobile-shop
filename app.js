// phone search data
const loadData = async () => {
   try {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();

    //  clear display\]
    searchInput.value = ""
    document.getElementById("phone-show").textContent = ""

    // fetching data
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
   const res = await fetch(url);
   const data = await res.json();
   showDisplayData(data.data)
   } catch (error) {
       console.log(error)
   }
}

// show ui load data
const showDisplayData = mobiles =>{
    const showPhone = document.getElementById("phone-show");

    if(mobiles.length === 0){
      document.getElementById("error-text").innerText = "No result found"
    }
    else if(mobiles.length === 20){
        
    }
    else{
        mobiles.forEach(mobile => {
        
            const newDiv = document.createElement("div");
            newDiv.classList.add("col-md-4");
            newDiv.innerHTML = `
            <div class="card mt-4">
                    <div>
                        <img src="${mobile.image}" alt="" />
                    </div>
                    <h5>Name: ${mobile.phone_name}</h5>
                    <h5>Model:${mobile.brand}</h5>
                    <div>
                    <button onclick="loadDetails('${mobile.slug}')" class="mobile-btn">
                    Explore
                  </button>
                    </div>
            </div>
            `
            // console.log(mobile.slug)
            showPhone.appendChild(newDiv);
            // clear display
            document.getElementById("error-text").innerText = "";
        });
    }
   
}

//  calling details
const loadDetails = details =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(res => res.json())
    .then(data => showDetailsUi(data.data))
}
const showDetailsUi = details => {
    console.log(details)
}