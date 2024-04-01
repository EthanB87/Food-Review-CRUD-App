const Types = {
    selectAll: function(){
        return new Promise((resolve, reject)=> {

            const transaction = db.transaction(["types"]);

            transaction.oncomplete = (event) => {
                console.log("Select all types successful");
            }

            transaction.onerror = event => console.log("Error: select all types failed" + event);

            const typesStore = transaction.objectStore("types");
            const typesCursor = typesStore.openCursor();

            let listOfTypes = [];
            typesCursor.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                    listOfTypes.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(listOfTypes);
                }
            }
        });
    },
}

const Reviews = {
    insert: function(review){

        return new Promise((resolve, reject)=>{

            const transaction = db.transaction(["reviews"], "readwrite");

            transaction.oncomplete = (event)=>{
                console.log("Insert review successful");
            }
            transaction.onerror = event => console.log("Error: insert review failed" + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.add(review);

            req.onsuccess = (event) => {
                console.log("Review resolved successfully");
                resolve(event);
            }
            req.onerror = (event) => {
                console.log("Error Inserting review" + event);
                reject(event);
            }
        });
    },
    select: function(id){
        return new Promise((resolve, reject)=>{

            const transaction = db.transaction(["reviews"]);

            transaction.oncomplete = (event)=>{
                console.log("select review successful");
            }

            transaction.onerror = event => console.log("Error: select review failed" + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.get(id);

            req.onsuccess = (event) => {
                console.log(event.target.result);
                event.target.result ? resolve(event.target.result) : resolve(null);
            }
            req.onerror = (event) => {
                console.log("Error selecting review" + event);
                reject(event);
            }
        });
    },
    selectAll: function(){
        return new Promise((resolve, reject)=> {

            const transaction = db.transaction(["reviews"]);

            transaction.oncomplete = (event) => {
                console.log("Select all reviews successful");
            }

            transaction.onerror = event => console.log("Error: select all reviews failed" + event);

            const reviewsStore = transaction.objectStore("reviews");
            const reviewsCursor = reviewsStore.openCursor();

            let listOfReviews = [];
            reviewsCursor.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                    listOfReviews.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(listOfReviews);
                }
            }
        });
    },

    update: function(review){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite");

            transaction.oncomplete = (event)=>{
                console.log("update reviews successful");
            }
            transaction.onerror = event => console.log("Error: update review failed" + event);

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.put(review);

            req.onsuccess = (event) => {
                console.log(event.target.result);
                console.log("Review updated successfully");
                resolve(event);
            }
            req.onerror = (event) => {
                console.log("Error updating review" + event);
                reject(event);
            }
        });
    },
    delete: function(id){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite");

            transaction.oncomplete = (event)=>{
                console.log("delete review successful");
            }

            transaction.onerror = () => console.log("Error: delete review failed");

            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.delete(id);

            req.onsuccess = (event) => {
                console.log(event.target.result);
                console.log("Review deleted successfully");
                resolve(event);
            }
            req.onerror = (event) => {
                console.log("Error deleting review" + event);
                reject(event);
            }
        });
    },
    deleteAll: function(){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite");
            transaction.oncomplete = (event)=>{
                console.log("Success: delete all transaction successful");
            }
            transaction.onerror = () => console.log("Error: delete all transaction failed :");

            const reviewStore = transaction.objectStore("reviews");

            const req = reviewStore.clear();
            req.onsuccess = (event)=>{
                console.log("Success: all records deleted successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: error in deleting all records : " + event);
                reject(event);
            }

        });
    },
}