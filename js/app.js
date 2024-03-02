//FUNCTION FOR ALL PHONES STARTS
let phoneData = [];
const allPhones = () => {
    //CLEAR PREVIOUS DATA WHEN SEARCH NEW PHONE
    document.getElementById('phone-container').innerHTML = "";
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('details-container').innerHTML = "";
    const search = document.getElementById('search-box').value;
    // console.log(search);

    //ALL PHONES API
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if (data.status == false) {
                document.getElementById('no-phone-error').innerText = 'No Phone Found';
                document.getElementById('spinner').style.display = "none";
                document.getElementById('load-more').style.display = "none";
            } else {
                showAllPhones(data.data);
                document.getElementById('no-phone-error').innerText = "";
                document.getElementById('load-more').style.display = "block";

            }
        });
};
//FUNCTION FOR ALL PHONES ENDS

//SPINNER DELAY TIMESET
const delay = ms => new Promise(res => setTimeout(res, ms));
//

//FUNCTION FOR SHOW PHONES STARTS
const showAllPhones = async(phones) => {

    await delay(1050);
    document.getElementById('spinner').style.display = "none";
    buildHtml(phones)

};
//FUNCTION FOR SHOW PHONES ENDS


//FUNCTION FOR CREATE HTML FOR CARDS STARTS
const buildHtml = (phones) => {
    // console.log(phones);
    // console.log(phones.data);
    const parent = document.getElementById('phone-container');
    const loadMoreButton = document.getElementById('load-more');
    console.log(loadMoreButton);
    loadMoreButton.hidden = true;
    // while (loadMoreButton.length > 0) {
    //     // loadMoreButton[0].parentNode.removeChild(loadMoreButton[0]);
    //     loadMoreButton[0].parentNode.parentNode.removeChild(loadMoreButton[0].parentNode);
    // }
    let counter = 0;
    for (const phone of phones) {
        // console.log(phone);

        const div = document.createElement('div');
        div.className = "card col-md-3 mx-4 col-sm-12 col-12 mb-5 p-2 border-0 shadow-lg";
        div.innerHTML = `<div class="">
                                <div class="phone-pic pb-2">
                                    <img src="${phone.image}" alt="" class="image-fluid" style="width:50px">
                                </div>
                                <h5>Phone Name: ${phone.phone_name}</h5>
                                    <h5>Brand: ${phone.brand}</h5>
                                <div class="explore">
                                
                                    <a onclick="details('${phone.slug}')" class="gradient-button gradient-button-1">Details</a><br />
                                </div>
                        </div>`;
        parent.appendChild(div);
        counter++;
        if (counter >= 20) {
            phoneData = phones.slice(20, phones.length)
            console.log(phoneData)
            loadMoreButton.hidden = false;
            break;
        }
    }
};
//FUNCTION FOR CREATE HTML FOR CARDS ENDS


//FUNCTION TO SEARCH PHONE ID STARTS
const details = (slug) => {
    console.log(slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => detailsInfo(data));
};
//FUNCTION TO SEARCH PHONE ID ENDS


//FUNCTION TO SHOW DETAILS STARTS
const detailsInfo = (info) => {
    // console.log(info.data);

    const detailsInfo = document.getElementById('details-container');
    // console.log(detailsInfo);
    const allInfo = info.data;
    console.log(allInfo);

    //CHECK VALUES IN RELEASE DATE
    let releaseObjectValue = "";
    if (allInfo.releaseDate !== "") {
        releaseObjectValue += allInfo.releaseDate;

    } else {
        releaseObjectValue += 'Not Available';
    }
    //

    //CHECK IF THERE IS NO VALUE IN OTHERS
    let obojectValue = "";
    if (typeof(allInfo.others) !== "undefined") {
        const objects = allInfo.others;
        for (const [key, value] of Object.entries(objects)) {
            obojectValue += `${key}: ${value}`;
        }
    } else {
        obojectValue += "No Others Informations";
    }
    //
    detailsInfo.innerHTML = `                  
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                            <img src="${allInfo.image}" alt="">
                            <h3 class="mt-4">Name: ${allInfo.name}</h3>
                            <h5>Release Date: ${releaseObjectValue}</h5>
    
                            <h5>Storage: ${allInfo.mainFeatures.storage}</h5>
                            <h5>Display Size: ${allInfo.mainFeatures.displaySize}</h5>
                            <h5>Chip Set: ${allInfo.mainFeatures.chipSet}</h5>
                            <h5>Memory: ${allInfo.mainFeatures.memory}</h5>
                            <h5>Sensors: ${allInfo.mainFeatures.sensors}</h5>
    
                            <h5>ID: ${allInfo.slug}</h5>    
                            <h5>Brand: ${allInfo.brand}</h5>
                       
                        <h5>Others: ${obojectValue}</h5>
                            </div>
                        </div>
                    </div>`;
};

//FUNCTION TO SHOW DETAILS ENDS


//FUNCTION TO LOAD MORE DATA STARTS
// buildHtml(phoneData);
function loadData() {
    buildHtml(phoneData);
}