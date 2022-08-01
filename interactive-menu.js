import { VaccinationData } from "./vaccination-data.js";
import inquirer from 'inquirer';


const askUserQuestions = () => {
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
            choices: ['Pfizer', 'Jansen', 'Astrazeneca', 'CoronaVac', 'Influenza']
        },
        {
            name: 'vaccineLot',
            message: 'Lot of the vaccine: ',
            type: 'input'
        },
    ];
    return inquirer.prompt(questions);
};

const freezeScreenForCapture = () => {
    const question = [
        {
            name: 'confirmation',
            message: 'Press ENTER to capture a photo...',
            type: 'input'
        }
    ];
    return inquirer.prompt(question);

}

const confirmClassification = (status) => {
    let statusMsg = status === 'loaded_syringe'? 'Syringe is loaded, correct?' : 'Syringe is discharged, correct?'
    
    const question = [
        {
            name: 'syringeStatus',
            message: statusMsg,
            type: 'confirm'
        }
    ];
    return inquirer.prompt(question);
};

const classificationResult = (readStatus, confirmed) => {
    if(confirmed)
        return readStatus;
    else if (readStatus === 'loaded_syringe' && !confirmed)
        return 'discharged_syringe';
    else if (readStatus === 'discharged_syringe' && !confirmed)
        return 'loaded_syringe';
    else
        return 'uncertain';
}

const createNewVaccinationData = async () => {
  
    const answers = await askUserQuestions();
    const { patient, nurse, vaccineType, vaccineLot } = answers;

    return new VaccinationData(patient, nurse, vaccineType, vaccineLot);

};


const confirmVaccineStatus = async (readStatus) => {
    const confirm = await confirmClassification(readStatus);

    return classificationResult(readStatus, confirm.syringeStatus)

}

  
export { createNewVaccinationData, confirmVaccineStatus, freezeScreenForCapture }