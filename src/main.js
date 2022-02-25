
import { findContributorWithSkill } from "./contributor.js";
import compute from "./compute.js";
import fs from "fs";

const inputFiles = [
    "a_an_example.in.txt",
    "b_better_start_small.in.txt",
    "c_collaboration.in.txt",
    "d_dense_schedule.in.txt",
    "e_exceptional_skills.in.txt",
    "f_find_great_mentors.in.txt",
];

for(let i = 0; i < inputFiles.length; i++) {
    const filename = inputFiles[i];
    console.log(`Processing ${filename}...`);
    compute(filename);
}

// compute(inputFiles[0]);
