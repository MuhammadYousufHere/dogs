/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Button,
} from "@mui/material";
import SubBreeds from "./SubBreeds";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import Breed from "./BreedSelect";
interface DogBreed {
  key: string;
  value: string;
}

interface ListAllResponse {
  message: {
    [key: string]: string[];
  };
}

interface ImageResponse {
  message: string;
}

const BreedSelectorBox = () => {
  const [breeds, setBreeds] = useState<DogBreed[]>([]);
  const [selectBreeds, setSelectBreeds] = useState<string>("");
  const [specific, SetSpecificBreeds] = useState<ImageResponse>();
  const [subBreed, SetSubBreeds] = useState<string>("");

  const fetchBreedsList = async () => {
    const { data } = await axios.get<ListAllResponse>(
      "https://dog.ceo/api/breeds/list/all"
    );
    const { message: allBreeds } = data;
    const keys = Object.keys(allBreeds);

    // resolve images and create DogBreed objects
    const dogBreeds = await Promise.all(
      keys.map(async (key) => {
        const {
          data: { message: value },
        } = await axios.get<ImageResponse>(
          `https://dog.ceo/api/breed/${encodeURIComponent(key)}/images/random`
        );
        return { key, value };
      })
    );
    setBreeds(dogBreeds);
  };

  //

  useEffect(() => {
    fetchBreedsList();
  }, []);
  //selected breeds sub-breeds
  const getBreed = async (key: string) => {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${encodeURI(key)}/list`
    );
    SetSpecificBreeds(data);
  };
  const getSubBreed = async (key: string) => {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${encodeURI(key)}/images`
    );
    SetSpecificBreeds(data);
  };
  useEffect(() => {
    getBreed("bulldog");
  }, [selectBreeds]);
  //onchange
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectBreeds(event.target.value as string);
  };
  const handleSubBreed = (event: SelectChangeEvent<unknown>) => {
    SetSubBreeds(event.target.value as string);
    console.log(event.target.value);
  };
  return (
    <>
      <Box style={{ display: "flex", width: "100%", gap: "1rem" }}>
        <Breed
          data={breeds}
          value={selectBreeds}
          name="breed"
          handleChange={handleChange}
        />

        <Button variant="contained">+</Button>
      </Box>
      <Box>
        <ImageList
          sx={{
            width: 500,
            height: 450,
            transform: "translateZ(0)",
          }}
          rowHeight={200}
          gap={1}
        >
          {/* {breeds?.map((breed: any) => {
            const cols = breed.featured ? 2 : 1;
            const rows = breed.featured ? 2 : 1;
            /// try to ignore those lines with const cols and rows

            return (
              <ImageListItem key={breed.key} cols={cols} rows={rows}>
                <img
                  src={breed.value}
                  alt={breed.key}
                  loading="lazy"
                  width={250}
                  height={200}
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={breed.key}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`star ${breed.key}`}
                    >
                      <StarBorder />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })} */}
          {/* <img src={specific?.message} alt="" /> */}
        </ImageList>
      </Box>
    </>
  );
};

export default BreedSelectorBox;
