import axios, { AxiosResponse } from "axios";

export default class RequestsService {
  baseUrl: string;

  constructor() {
    // source: https://stackoverflow.com/questions/35469836/detecting-production-vs-development-react-at-runtime
    if (
      !import.meta.env.NODE_ENV ||
      import.meta.env.NODE_ENV === "development"
    ) {
      this.baseUrl = import.meta.env.VITE_URL!;
    } else {
      this.baseUrl = "localhost";
    }

    this.baseUrl = `http://${this.baseUrl}/api`;
  }

  async get<T>(route: string): Promise<AxiosResponse<T>> {
    return axios({
      method: "get",
      url: `${this.baseUrl}/${route}`,
    });
  }
}
