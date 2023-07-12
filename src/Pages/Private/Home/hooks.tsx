import { useEffect, useState } from "react"
import { getJob } from "../../../Services/Job";
import { JobsTypes } from "./types";

export const useHomeHooks = () => {
    const [page, setPage] = useState(1);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [fullTime, setFullTime] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [jobs, setJobs] = useState<JobsTypes[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [search, setSearch] = useState(false);

    const fetchJob = async () => {
        setLoading(true);
        const response = await getJob(page, description, location, fullTime);
        if (response.error) {
            setLoading(false);
        } else {
            setLoading(false);
            setJobs(response.data);
        }
    };

    const fetchLoadMore = async () => {
        setLoadingMore(true);
        const response = await getJob(page + 1, description, location, fullTime);
        if (response.error) {
            setLoadingMore(false);
            setError(true);
        } else {
            setLoadingMore(false);
            setPage(page + 1)
            setJobs([...jobs, ...response.data]);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        const response = await getJob(page, description, location, fullTime);
        if (response.error) {
            setLoading(false);
        } else {
            setLoading(false);
            setJobs(response.data);
            setSearch(true);
        }
    };

    useEffect(() => {
        fetchJob();
    }, []);

    return {
        jobs, loading, fetchLoadMore, loadingMore, error, description, setDescription, location, setLocation, fullTime, setFullTime, fetchJob, handleSearch, search
    }
}