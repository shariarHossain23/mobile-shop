// phone search data
const loadData = async () => {
   try {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();

    //  clear display\]
    searchInput.value = ""

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
                  <button onclick="" class="mobile-btn">Explore</button>
                </div>
        </div>
        `
        showPhone.appendChild(newDiv);
    });
}