import { IVideo } from "../models/vedio"; // Ensure correct file name


export type videoFormData = Omit<IVideo, "_id">
type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
};

class ApiClient {
    private async fetch<T>(endPoint: string, options: FetchOptions = {}): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };

        const response = await fetch(`/api${endPoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    async getVideos(): Promise<IVideo[]> {
        return this.fetch<IVideo[]>("/videos");
    }

    async getAVideos(id: string) {
        return this.fetch<IVideo>(`/videos/${id}`)
    }

    async createVideo(videoData: videoFormData) {
        return this.fetch("/videos", {
            method: "POST",
            body: videoData
        })
    }
}

export const apiclient = new ApiClient();
