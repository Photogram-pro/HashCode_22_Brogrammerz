import parseFile from "./parser.js";

const fileName = "a_an_example.in.txt";
const {contributors, projects} = parseFile("../input/"+fileName);
console.log(contributors);
console.log(projects);