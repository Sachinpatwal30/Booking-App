import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {

    console.log("inside use fetch", url);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
        setLoading(true);

            try {
                
                const res = await axios.get(url); 
                setData(res.data);
            } catch (err) {
                setError(true);

            }
            setLoading(false);
        }
        fetchData();
    }, [url])


    const reFetch = async () => {

        console.log("inside reFetch")

        setLoading(true);

        try {

            const res = await axios.get(url);
            setData(res.data);

        } catch (error) {

            setError(true);
        }
        setLoading(false);
    };

    return { data, error, loading, reFetch };


}
export default useFetch;

