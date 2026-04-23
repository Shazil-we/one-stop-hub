interface Query{
    name:string,
    query:string
};
export const Requests:Query[] = [
    {
        name: "Select all Requests Made",
        query: `
        SELECT * 
        FROM requests
        `
    },

]