var db;

function createDatabase(){
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open("FeedbackDB", 1);
        request.onerror = event=> console.error("Error in creating database");
        request.onsuccess = (event)=>{
            console.log("On Success Called");
            db = event.target.result;
            resolve(db);
        }
        request.onupgradeneeded = (event)=>{
            db = event.target.result;
            console.log("onupgradeneeded called");

            const typesStore = db.createObjectStore("types", {
                keyPath: "id",
                autoIncrement: true
            });

            const reviewsStore = db.createObjectStore("reviews", {
                keyPath: "id",
                autoIncrement: true
            });
        }

        request.onsuccess = (event) => {
            db = event.target.result;
            const transaction = db.transaction(["types"], "readwrite");
            const typesStore = transaction.objectStore("types");

            const typesData = [
                { name: "Other" },
                { name: "Canadian" },
                { name: "Asian" },
                { name: "European" },
                { name: "Australian" }
            ];

            const getRequest = typesStore.getAll();
            getRequest.onsuccess = () => {
                const existingTypes = getRequest.result;
                const newTypes = typesData.filter(data =>
                    !existingTypes.some(existing => existing.name === data.name));
                newTypes.forEach(data => {
                    typesStore.add(data);
                });
            };
        }
    });
}