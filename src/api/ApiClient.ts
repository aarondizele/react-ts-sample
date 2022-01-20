import request from "../request";

const ApiClient = (() => {
    return {
        getProfile: async () => {
            try {
                const { data } = await request.get("/user");
                console.log(data);
                return data;
            } catch (error) {
                // console.error(error);
            }
        }
    }
})();

export { ApiClient }