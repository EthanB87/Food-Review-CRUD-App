let isDropdownFilled = false;
function checkRatings_change() {
    toggleRatings();
}

function btnSave_click() {
    if(doValidate_formAddReview()){
        console.log("Add Form is Valid");
        addFeedback();
        clearForm();
    }
    else{
        console.log("Add Form is Invalid");
    }
}

function txtQuality_change() {
    updateRatings();
}

function txtService_change() {
    updateRatings();
}

function txtValue_change() {
    updateRatings();
}

function btnUpdate_click() {
    if(doValidate_formModifyReview()){
        updateFeedback();
    }
    else{
        console.log("Modify Form is Invalid");
    }
}
function btnDelete_click() {
    deleteFeedback();
}

function btnSaveDefaults_click() {
    storeEmail();
}

function onAddPage_show() {
    clearForm();
    if(!isDropdownFilled){
        fillTypesDropdown();
        isDropdownFilled = true;
    }
}

function onViewPage_show() {
    getReviews();
}

function onModifyPage_show() {
    fillTypesDropdownModify();
    showCurrentReview();
}

function btnClearAll_click() {
    clearReviews();
}

function init(){
    console.log("DOM is ready");
    $("#ratingSection, #modifyRatingSection").hide();
    $("#chkAddRatings, #chkModifyRatings").on("change", checkRatings_change);
    $("#btnSave").on("click", btnSave_click);
    $("#txtQuality, #txtQualityModify").on("change", txtQuality_change);
    $("#txtService, #txtServiceModify").on("change", txtService_change);
    $("#txtValue, #txtValueModify").on("change", txtValue_change);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnSaveDefaults").on("click", btnSaveDefaults_click);
    $("#ebAddFeedbackPage").on("pageshow", onAddPage_show);
    $("#ebViewFeedbackPage").on("pageshow", onViewPage_show);
    $("#ebModifyFeedbackPage").on("pageshow", onModifyPage_show);
    $("#btnClearAll").on("click", btnClearAll_click);
}

$(document).ready(function () {
    init();
    toggleRatings();
    initDatabase();
});