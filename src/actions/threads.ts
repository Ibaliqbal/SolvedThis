"use server";

import { CreatedThreadSchemaT } from "../types/thread";

export const createThreads = async ({}: CreatedThreadSchemaT): Promise<{
  message: string;
}> => {
  console.log("createThreads");

  return {
    message: "Success create threads",
  };
};
