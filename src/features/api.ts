import axios from "axios";
export interface Dogs {
  message: {
    [key: string]: string[];
  };

}
const URL = "https://dog.ceo/api/breeds/list/all"
export const getDogs = async (): Promise<Dogs[]> => {
  const { data } = await axios.get(URL);
  return data
}