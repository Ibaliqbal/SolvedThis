"use server";

import { auth } from "@/auth";
import { CreatedThreadSchemaT, ReplyThreadSchemaT } from "../types/thread";

export const createThreads = async ({}: CreatedThreadSchemaT): Promise<{
  message: string;
}> => {
  console.log("createThreads");

  return {
    message: "Success create threads",
  };
};

export const createReply = async ({}: ReplyThreadSchemaT): Promise<{
  message: string;
}> => {
  console.log("createReply");

  return {
    message: "Succes create reply",
  };
};
