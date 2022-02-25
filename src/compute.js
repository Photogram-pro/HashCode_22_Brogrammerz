import fs from "fs";
import parseFile from "./parser.js";
import { findContributorWithSkill } from "./contributor.js";


const compute = filename => {
    const {contributors, projects} = parseFile("../input/"+filename);


    // // Sort by score descending
    // projects.sort((a, b) => {
    //     return b.score - a.score;
    // });
    
    projects.sort((a, b) => {
        return a.dueDate - b.dueDate;
    });

    let actualDay = 0;
    const final = [];
    for(let i = 0; i < projects.length; i++) {

        const project = projects[i];

        if(project.dueDate > (actualDay + project.duration) - project.score) {
            const assignments = [];
            let foundForAll = true;
            for(let j = 0; j < project.skills.length; j++) {


                const skill = project.skills[j];
                const contributor = findContributorWithSkill(contributors, assignments, skill);
                if(contributor !== null) {
                    assignments.push(contributor);
                } else {
                    foundForAll = false;
                }
            }
            if(foundForAll) {
                final.push([project, assignments]);

                actualDay += project.duration;

                // Learn
                for(let j = 0; j < assignments.length; j++) {
                    const actulSkill = project.skills[j];
                    if(assignments[j].skills.forEach((skill) => {
                        if(skill.name === actulSkill.name && skill.level <= actulSkill.level) {
                            skill.level++;
                        }
                    }));
                }
            }
        }


    }

    let output = "";
    output += final.length + "\n";
    for(let i = 0; i < final.length; i++) {
        const project = final[i][0];
        const assignments = final[i][1];
        output += project.name + "\n";
        for(let j = 0; j < assignments.length; j++) {
            const contributor = assignments[j];
            output += contributor.name + " ";
        }
        output += "\n";
    }

    fs.writeFile('../out/'+filename.replace("in", "out"), output, err => {});

}

export default compute;