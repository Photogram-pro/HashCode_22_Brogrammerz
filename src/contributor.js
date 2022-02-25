
class Contributor {
    constructor(name, skills) {
        this.name = name;
        this.skills = skills;
    }
}

export const getAllWorkers = (contributors, neededSkill) => {
    return contributors.filter((contributor) => {
        return contributor.skills.some((skill) => {
            return skill.name === neededSkill.name && neededSkill.level <= skill.level;
        });
    });
};

export const getAllWorkersThatNeedMentor = (contributors, possibleWorkers, neededSkill) => {
    const possibleWorkersSet = new Set();
    for(let i = 0; i < possibleWorkers.length; i++) {
        for(let j = 0; j < possibleWorkers[i].length; j++) {
            possibleWorkersSet.add(possibleWorkers[i][j]);
        }
    }
    return contributors.filter((contributor) => {
        return contributor.skills.some((skill) => {
            return skill.name === neededSkill.name && skill.level === neededSkill.level - 1 && possibleWorkersSet.has(contributor);
        });
    });
};

export const findContributorWithSkill = (contributors, contributorsToExclude, skill) => {
    for(let i = 0; i < contributors.length; i++) {
        const contributor = contributors[i];
        for(let j = 0; j < contributor.skills.length; j++) {
            const contributorSkill = contributor.skills[j];
            if(contributorSkill.name === skill.name && contributorSkill.level >= skill.level) {
                if(contributorsToExclude.indexOf(contributor) === -1) {
                    return contributor;
                }
            }
        }
    }
    return null;
}

export default Contributor;