import fs, { read } from 'fs';
import readline from 'readline';
import events from 'events';
import Project from './project.js';
import Skill from './skill.js';
import Contributor from './contributor.js';


class LineReader {
    constructor(fileName) {
        this.rawLines = fs.readFileSync(fileName).toString().split("\n");
        this.interator = 0;
    }

    nextLine() {
        const line = this.rawLines[this.interator];
        this.interator++;
        return line;
    }

    hasNextLine() {
        return this.interator < this.rawLines.length;
    } 

}

const parseFile = (filePath) => {


    const reader = new LineReader(filePath);

    let nrOfContributors = -1; // C
    let nrOfProject = -1; // P

    const fileInfo = reader.nextLine().split(" ");
    nrOfContributors = parseInt(fileInfo[0]);
    nrOfProject = parseInt(fileInfo[1]);

    let contributors = [];
    for(let i = 0; i < nrOfContributors; i++) {
        const contributorInfo = reader.nextLine().split(" ");
        const name = contributorInfo[0];
        const nrOfSkills = parseInt(contributorInfo[1]);

        const skills = [];
        for(let v=0; v < nrOfSkills; v++) {
            const skillInfo = reader.nextLine().split(" ");
            const skillName = skillInfo[0];
            const skillLevel = parseInt(skillInfo[1]);
            skills.push(new Skill(skillName, skillLevel));
        }
        
        contributors.push(new Contributor(name, skills));
    }


    let projects = [];
    for(let i = 0; i < nrOfProject; i++) {
        const projInfo = reader.nextLine().split(' ');
        const projName = projInfo[0];
        const projDuration = parseInt(projInfo[1]);
        const projScore = parseInt(projInfo[2]);
        const projDueDate = projInfo[3];
        const projNrOfSkills = parseInt(projInfo[4]);

        const skills = [];
        for(let v=0; v < projNrOfSkills; v++) {
            const skillInfo = reader.nextLine().split(' ');
            const skillName = skillInfo[0];
            const skillLevel = parseInt(skillInfo[1]);
            skills.push(new Skill(skillName, skillLevel));
        }

        projects.push(new Project(projName, projDuration, projScore, projDueDate, skills));

    }

    return {
        contributors,
        projects
    };
};

export default parseFile;