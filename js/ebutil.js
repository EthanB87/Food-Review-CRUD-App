
function doValidate_formAddReview(){
    const form = $("#formAddReview");
    form.validate({
        rules:{
            txtNameAdd:{
                required: true,
                rangelength: [2,20]
            },
            txtEmailAdd: {
                required: true,
                emailcheck: true
            },
            txtReviewDateAdd:{
                required: true
            },
            txtQuality:{
                required: {
                    depends: function (element){
                        return $("#chkAddRatings").is(":checked");
                    }
                },
                max: 5
            },
            txtService:{
                required: {
                    depends: function (element) {
                        return $("#chkAddRatings").is(":checked");
                    }
                },
                max: 5
            },
            txtValue:{
                required: {
                    depends: function (element){
                        return $("#chkAddRatings").is(":checked");
                        }
                    },
                max: 5
            }
        },
        messages:{
            txtNameAdd:{
                required: "Name is required",
                rangelength: "Name must be at least two characters long"
            },
            txtEmailAdd:{
                required: "Email is required",
                emailcheck: "Email must be valid"
            },
            txtReviewDateAdd: {
                required: "Review Date is required"
            },
            txtQuality:{
                required: "Please add a rating",
                ratingcheck: "Rating must be 0-5"
            },
            txtService:{
                required: "Please add a rating",
                ratingcheck: "Rating must be 0-5"
            },
            txtValue:{
                required: "Please add a rating",
                ratingcheck: "Rating must be 0-5"
            }
        }
    });
    return form.valid();
}


function doValidate_formModifyReview(){
    const form = $("#formModifyReview")
    form.validate({
        rules:{
            txtNameModify:{
                required: true,
                rangelength: [2,20]
            },
            txtEmailModify: {
                required: true,
                emailcheck: true
            },
            txtReviewDateModify:{
                required: true
            },
            txtQualityModify:{
                required: {
                    depends: function (element) {
                        return $("#chkModifyRatings").is(":checked");
                        }
                    },
                max: 5
            },
            txtServiceModify:{
                required: {
                    depends: function (element) {
                        return $("#chkModifyRatings").is(":checked");
                        }
                    },
                max: 5
            },
            txtValueModify:{
                required: {
                    depends: function (element) {
                        return $("#chkModifyRatings").is(":checked");
                        }
                    },
                max: 5
            }
        },
        messages:{
            txtNameModify:{
                required: "Name is required",
                rangelength: "Name must be at least two characters long"
            },
            txtEmailModify:{
                required: "Email is required",
                emailcheck: "Email must be valid"
            },
            txtReviewDateModify: {
                required: "Review Date is required"
            },
            txtQualityModify:{
                required: "Please add a rating",
                ratingcheck: "Rating must be 0-5"
            },
            txtServiceModify:{
                required: "Please add a rating",
                ratingcheck: "Rating must be 0-5"
            },
            txtValueModify:{
                required: "Please add a rating",
                ratingcheck: "Rating must be 0-5"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod(
    "emailcheck",
    function(value, element){
        const regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return this.optional(element) || regexp.test(value);
    },
    "Valid email checker"
);