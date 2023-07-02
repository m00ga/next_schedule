"use client";

import { useContext } from "react";
import { DateContext } from "@/providers/DateProvider";

export const useDate = () => useContext(DateContext);
