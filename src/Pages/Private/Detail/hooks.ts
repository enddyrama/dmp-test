import { useEffect, useState } from "react";
import { getJobDetail } from "../../../Services/Job";
import { useParams } from "react-router-dom";
import { JobsTypes } from "../Home/types";

export const useDetailHooks = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [job, setJob] = useState<JobsTypes>();

    const fetchJob = async () => {
        setLoading(true);
        const response = await getJobDetail(id ? id : "");
        if (response.error) {
            setLoading(false);
        } else {
            setLoading(false);
            setJob(response.data);
        }
    };

    useEffect(() => {
        fetchJob();
    }, []);

    return {
        job, loading
    }
};