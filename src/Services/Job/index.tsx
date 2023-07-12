import callAPI from "..";

const getJob = async (page: number, desc: string, location: string, full_time: boolean) => {
    const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${page}&description=${desc}&location=${location}${full_time ? `&full_time=${full_time}` : ""}`
    return callAPI({
        url,
        method: "GET",
    });
};

const getJobDetail = async (id: string) => {
    const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
    return callAPI({
        url,
        method: "GET",
    });
};

export { getJob, getJobDetail };