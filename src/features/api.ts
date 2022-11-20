import axios from "axios";
export interface Dogs {
  message: {
    [key: string]: string[];
  };
  status: string;
}
export interface Breeds {
  key: string;
  value: string[]
}
export interface ImageResponse {
  message: string[];
}
export interface Params {
  breed: string,
  subBreed: string,
}

const URL = "https://dog.ceo/api/breeds/list/all";


export const getDogs = async (): Promise<Dogs> => {
  const { data } = await axios.get(URL);
  return data

}
export const getBreeds = async (allBreeds: Dogs): Promise<Breeds[]> => {
  const { message: data } = allBreeds;
  const keys = Object.keys(data);
  const dogBreeds = await Promise.all(
    keys.map(async (key) => {
      const {
        data: { message: value },
      } = await axios.get<ImageResponse>(
        `https://dog.ceo/api/breed/${encodeURI(key)}/list`
      );
      return { key, value };
    })
  );
  return dogBreeds
}

export const getSubBreed = async (breed: string) => {
  return await new Promise<Dogs>(async (resolve, reject) => {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${encodeURI(breed)}/list`
    );
    resolve(data)
  })
};

interface RetrieveImagesResponse {
  message: [key: string],
  status: string;
}
export const getSubBreedImages = async (breed: string, subBreed: string) => {
  return await new Promise<Dogs>(async (resolve, reject) => {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${encodeURI(breed)}/${encodeURI(subBreed)}/images`
    );
    resolve(data)
  })
};