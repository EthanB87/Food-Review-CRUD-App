
function calculateOverallRating(quality, service, value) {
    return ((quality + service + value) * 100) / 15;
}

function updateRatings(){
    const quality = Number($("#txtQuality").val());
    const qualityModify = Number($("#txtQualityModify").val());
    const service = Number($("#txtService").val());
    const serviceModify = Number($("#txtServiceModify").val());
    const value = Number($("#txtValue").val());
    const valueModify = Number($("#txtValueModify").val());
    const overallRating = calculateOverallRating(quality, service, value);
    const overallRatingModify = calculateOverallRating(qualityModify, serviceModify, valueModify);

    $("#txtOverallRating").val(overallRating.toFixed(1) + "%");
    $("#txtOverallRatingModify").val(overallRatingModify.toFixed(1) + "%");
}


function toggleRatings() {
    if($("#chkAddRatings").is(":checked")) {
        $("#ratingSection").show();
        $("#txtQuality, #txtService, #txtValue, #txtOverallRating").val(0);
    }
    else {
        $("#ratingSection").hide();
    }

    if($("#chkModifyRatings").is(":checked")) {
        $("#modifyRatingSection").show();
        $("#txtQualityModify, #txtServiceModify, #txtValueModify, #txtOverallRatingModify").val(0);
    }
    else {
        $("#modifyRatingSection").hide();
    }
}

function storeEmail(){
    var email = $("#txtDefaultEmailAdd").val();
    localStorage.setItem("email", email);
    alert("Reviewer email saved");
}

function initDatabase(){
    createDatabase()
        .then((data)=>{
            console.log("Database Created successfully");
        })
        .catch((e)=>{
            console.log("Error Creating Database" + e);
        });
}
function clearForm(){
    $("#txtNameAdd").val("");

    $("#cmbType").val("Other");

    $("#txtareaCommentsAdd").val("");

    $("#txtReviewDateAdd").val("");

    $("#chkAddRatings").prop("checked", false).checkboxradio("refresh");

    $("#ratingSection").hide();
    $("#txtQuality").val("0");
    $("#txtService").val("0");
    $("#txtValue").val("0");
    $("#txtOverallRating").val("");
}
function fillTypesDropdown() {
    Types.selectAll().then((types) => {
        const typeDropdown = $("#cmbType");
        typeDropdown.val(1);
        types.forEach(type => {
            const typeOption = $("<option></option>");
            typeOption.attr("value", type.id);
            typeOption.text(type.name);
            typeDropdown.append(typeOption);
        });
        typeDropdown.selectmenu("refresh");
    }).catch(e => {
        console.error("Error Fetching Types:" + e);
    });
}

function fillTypesDropdownModify() {
    Types.selectAll().then((types) => {
        const typeDropdown = $("#cmbTypeModify");
        typeDropdown.empty();
        types.forEach(type => {
            const typeOption = $("<option></option>");
            typeOption.attr("value", type.id);
            typeOption.text(type.name);
            typeDropdown.append(typeOption);
        });
        typeDropdown.selectmenu("refresh");
    }).catch(e => {
        console.error("Error Fetching Types:" + e);
    });
}

function addFeedback(){
    const businessName = $("#txtNameAdd").val();
    const reviewerEmail = $("#txtEmailAdd").val();
    const reviewerComments = $("#txtareaCommentsAdd").val();
    const reviewDate = $("#txtReviewDateAdd").val();
    const rating1 = Number($("#txtQuality").val());
    const rating2 = Number($("#txtService").val());
    const rating3 = Number($("#txtValue").val());
    const hasRatings = !!$("#chkAddRatings").prop("checked");
    const typeId = Number($("#cmbType").val());
    const review = {
        businessName,
        reviewerEmail,
        reviewerComments,
        reviewDate,
        hasRatings,
        rating1,
        rating2,
        rating3,
        typeId
    };

    Reviews.insert(review).then(() =>{
        alert("Review Added Successfully");
    }).catch((e) =>{
        console.log("Error:" + e);
    });
}
function getReviews() {
    let reviewList = $("#lstViewFeedback");
    reviewList.empty();

    Reviews.selectAll().then((reviews) => {
        let htmlCode = "";
        if (reviews.length === 0) {
            htmlCode = "<h1>No record found</h1>";
        }
        else{
            reviews.forEach(review => {
                let ovrRating = "";

                if(review.hasRatings) {
                    ovrRating = getReviewRating(review) + "%";
                }

                htmlCode += `<li><a data-role="button" href="#ebModifyFeedbackPage" data-row-id="${review.id}">
                        <h1>${review.businessName}</h1>
                        <p>${review.reviewerEmail}</p>
                        <p>${ovrRating}</p>
                       </a></li>`;
            });
        }
        reviewList = reviewList.html(htmlCode);
        reviewList.listview("refresh");

        $("#lstViewFeedback a").click(function() {
            const rowId = $(this).attr("data-row-id");
            localStorage.setItem("selectedReviewId", rowId);
        });
    }).catch(e => {
        console.error("Error fetching reviews:", e);
    });
}

function showCurrentReview(){
    const selectedReviewId = Number(localStorage.getItem("selectedReviewId"));
    Reviews.select(selectedReviewId).then((review) => {
        $("#txtNameModify").val(review.businessName);
        setTimeout(function() {
            $("#cmbTypeModify").val(Number(review.typeId)).trigger("change");
        }, 50);
        $("#txtEmailModify").val(review.reviewerEmail);
        $("#txtareaCommentsModify").val(review.reviewerComments);
        $("#txtReviewDateModify").val(review.reviewDate);

        if(review.hasRatings === true){
            $("#chkModifyRatings").prop("checked", true).checkboxradio("refresh");
            $("#modifyRatingSection").show();
            $("#txtQualityModify").val(review.rating1);
            $("#txtServiceModify").val(review.rating2);
            $("#txtValueModify").val(review.rating3);
            $("#txtOverallRatingModify").val(getReviewRating(review));
        }
        else{
            $("#chkModifyRatings").prop("checked", false).checkboxradio("refresh");
            $("#modifyRatingSection").hide();
        }
    }).catch((e) =>{
        console.error("Error Getting Review:" + e);
    })
}

function updateFeedback(){
    const selectedReviewId = Number(localStorage.getItem("selectedReviewId"));
    const businessName = $("#txtNameModify").val();
    const reviewerEmail = $("#txtEmailModify").val();
    const reviewerComments = $("#txtareaCommentsModify").val();
    const reviewDate = $("#txtReviewDateModify").val();
    const hasRatings = !!$("#chkAddRatings").prop("checked");
    const rating1 = hasRatings ? Number($("#txtQualityModify").val()) : 0;
    const rating2 = hasRatings ? Number($("#txtServiceModify").val()) : 0;
    const rating3 = hasRatings ? Number($("#txtValueModify").val()) : 0;

    const updatedReview = {
        businessName,
        reviewerEmail,
        reviewerComments,
        reviewDate,
        hasRatings,
        rating1,
        rating2,
        rating3
    };

    updatedReview.id = selectedReviewId;
    Reviews.update(updatedReview).then((data) =>{
        alert("Record Updated Successfully");
        $.mobile.changePage("#ebViewFeedbackPage", {transition: 'none'})
    }).catch((e) =>{
        alert("Error Updating Record" + e);
    });
}

function deleteFeedback(){
    const selectedReviewId = Number(localStorage.getItem("selectedReviewId"));

    Reviews.delete(selectedReviewId).then((data) => {
        alert("Record Deleted Successfully");
        $.mobile.changePage("#ebViewFeedbackPage", {transition: 'none'})
    }).catch((e) =>{
        alert("Error Deleting Record" + e);
    });
}
function getReviewRating(review){
    const quality = Number(review.rating1);
    const service = Number(review.rating2);
    const value = Number(review.rating3);

    const rating = calculateOverallRating(quality, service, value);
    console.log(rating)
    return rating.toFixed(1);
}

function clearReviews(){
    const result = confirm("Do you really want to delete?")
    if(result) {
        Reviews.deleteAll().then((data)=>{
            alert("All records deleted successfully");
        }).catch((e)=>{
            console.log(e);
        });
    }

}