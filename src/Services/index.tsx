import axios, { AxiosRequestConfig } from "axios";

interface CallAPIProps extends AxiosRequestConfig {
    token?: boolean;
}

export default async function callAPI({
    url,
    method,
    data,
    token,
}: CallAPIProps) {
    // CONSOLE PARAMS
    // console.log("url", { url });
    // console.log("method", { method });
    // console.log("datas", data);

    const timestamp = String(Math.floor(Date.now() / 1000));

    let headers;
    headers = {

    }
    const response: any = await axios({
        url,
        method,
        data,
        headers,
    }).catch((err: any) => err.response);
    console.log("url", url)
    console.log("response", response)

    let res;
    if (response === undefined) {
        res = {
            error: true,
            message: "Koneksi internet mengalami gangguan",
            data: null,
        };
    } else {
        if (response.status !== 200) {
            res = {
                error: true,
                message: response.statusText ? response.statusText : response.error,
                data: null,
            };
        } else {
            const { length } = Object.keys(response.data);
            // console.log(length)
            res = {
                error: false,
                message: "Success",
                data: length > 1 ? response.data : response,
            };
        }
    }

    return res;
}