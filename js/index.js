// load all phones
const loadPhones = async (searchText = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    handleAllPhone(phones, isShowAll);
    // console.log(data);
};

// show all phones
const handleAllPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card border-2 border-gray-200 rounded-lg`;

        phoneCard.innerHTML = `
        <div class="px-8 pt-8">
            <figure class="bg-[#0D6EFD0D] p-8 rounded-lg">
                <img src="${phone.image}" alt="phones" class="rounded-xl" />
            </figure>
        </div>
        <div class="card-body items-center text-center">
                <h2 class="card-title text-2xl text-[#100F0F]">${phone.phone_name}</h2>
                <p class="text-gray-600">If a dog chews shoes whose shoes does he choose?</p>
                <h4 class="text-2xl font-semibold text-[#100F0F]">$999</h4>
            <div class="card-actions">
                <button onclick="" class="btn btn-primary text-xl text-white font-semibold rounded-lg min-w-48 border-none bg-[#0D6EFD]">Show Details</button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneCard);
        console.log(phone);
    });
};

// handle show all
const handleShowAll = () =>{

    handleSearchPhone(true)
};

// handle search phone
const handleSearchPhone = (isShowAll) => {
    const searchPhone = document.getElementById('search-phone');
    const searchText = searchPhone.value;
    console.log(searchText);
    loadPhones(searchText, isShowAll);
};
loadPhones();