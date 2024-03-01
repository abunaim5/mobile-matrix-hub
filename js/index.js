// load all phones
const loadPhones = async (searchText = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    handleAllPhone(phones, isShowAll);
};

// show all phones
const handleAllPhone = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if (!isShowAll && phones.length > 12) {
        showAllContainer.classList.remove('hidden');
        phones = phones.slice(0, 12);
    }
    else {
        showAllContainer.classList.add('hidden');
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
                <p class="text-gray-600">As usual, we provide detailed information about every aspect of the smartphone.</p>
                <h4 class="text-2xl font-semibold text-[#100F0F]">$999</h4>
            <div class="card-actions">
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary text-xl text-white font-semibold rounded-lg min-w-48 border-none bg-[#0D6EFD]">Show Details</button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });
    handleLoadingBar(false);
};

// load phone details
const loadPhoneDetails = async (phoneId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    const data = await res.json();
    console.log(data.data);
    const phoneDetails = data.data;
    handleShowModal(phoneDetails);
};

// handle show modal
const handleShowModal = (phoneDetails) => {
    const modalContainer = document.getElementById('show_modal');
    const div = document.createElement('div');
    div.classList = `modal-box space-y-3 rounded-lg`;
    div.innerHTML = `
    <div class="flex justify-center items-center w-full bg-[#0D6EFD0D] rounded-lg py-10">
        <img src="${phoneDetails.image}" alt="">
    </div>
    <h3 class="font-bold text-3xl">${phoneDetails.name}</h3>
    <p class="text-base">Early products were marketed primarily towards the enterprise market.</p>
    <p class="text-xl font-semibold text-[#403F3F]">Storage: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.mainFeatures?.storage}</span></p>
    <p class="text-xl font-semibold text-[#403F3F]">Display Size: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.mainFeatures?.displaySize}</span></p>
    <p class="text-xl font-semibold text-[#403F3F]">Chipset: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.mainFeatures?.chipSet}</span></p>
    <p class="text-xl font-semibold text-[#403F3F]">Memory: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.mainFeatures?.memory}</span></p>
    <p class="text-xl font-semibold text-[#403F3F]">Slug: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.slug}</span></p>
    <p class="text-xl font-semibold text-[#403F3F]">Brand: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.brand}</span></p>
    <p class="text-xl font-semibold text-[#403F3F]">GPS: <span class="text-[#706F6F] text-base font-normal">${phoneDetails?.others?.GPS ?? 'Not available'}</span></p>
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn text-white text-xl font-semibold bg-[#DC3545] min-w-28">Close</button>
        </form>
    </div>
    `;
    modalContainer.appendChild(div);
    show_modal.showModal()
};

// handle loading bar
const handleLoadingBar = (isLoading) => {
    const loadingContainer = document.getElementById('loading-container');
    if (isLoading) {
        loadingContainer.classList.remove('hidden');
    }
    else {
        loadingContainer.classList.add('hidden');
    }
};

// handle show all
const handleShowAll = () => {
    handleSearchPhone(true);
};

// handle search phone
const handleSearchPhone = (isShowAll) => {
    const searchPhone = document.getElementById('search-phone');
    const searchText = searchPhone.value;
    // console.log(searchText);
    loadPhones(searchText, isShowAll);
    handleLoadingBar(true);
};
loadPhones();