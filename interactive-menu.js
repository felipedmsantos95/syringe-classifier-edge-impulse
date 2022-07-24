import { VaccinationData } from "./vaccination-data.js";
import inquirer from 'inquirer';


const askQuestions = () => {
    const questions = [
        {
            name: 'patient',
            message: 'Patient\'s name: ',
            type: 'input'
        },
        {
            name: 'nurse',
            message: 'Nurse\'s name: ',
            type: 'input'
        },
        {
            name: 'vaccineType',
            message: 'Wich vaccine is being applied? ',
            type: 'list',
            choices: ['Pfizer', 'Jansen', 'Aztrazeneca', 'CoronaVac', 'Influenza']
        },
        {
            name: 'vaccineLot',
            message: 'Lot of the vaccine: ',
            type: 'input'
        },
    ];
    return inquirer.prompt(questions);
};
  

const interactiveMenuData = async () => {
  
    const answers = await askQuestions();
    const { patient, nurse, vaccineType, vaccineLot } = answers

    return new VaccinationData(patient, nurse, vaccineType, vaccineLot)

};

  
export { interactiveMenuData }